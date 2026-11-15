export interface ClinicalStatus {
  online: boolean;
  models: string[];
  activeModel: string;
}

export interface EvaluationInput {
  pazientePseudonimo: string;
  etaAnni: string | number;
  etaMesi: string | number;
  sedeClinica: 'Ancona' | 'Jesi' | 'Sassoferrato';
  areaClinica: 'SMOF' | 'LINGUAGGIO' | 'DSA' | 'FLUENZA' | 'VOCE';
  inviatoDa: string;
  motivoConsulenza: string;
  anamnesiNote: string;
  esameObiettivo: {
    // SMOF
    posturaLinguale?: string;
    sigilloLabiale?: string;
    frenulo?: string;
    deglutizione?: string;
    respirazione?: string;
    masticazione?: string;
    tonoMuscolare?: string;
    // LINGUAGGIO
    inventarioFonetico?: string;
    processiFonologici?: string;
    comprensioneVerbale?: string;
    metafonologia?: string;
    // DSA
    letturaRapidita?: string;
    letturaErrori?: string;
    letturaFascia?: string;
    scritturaErrori?: string;
    calcoloDifficolta?: string;
    pdpMisure?: string[];
    // VOCE
    girbasG?: number;
    girbasR?: number;
    girbasB?: number;
    girbasS?: number;
    tmfSecondi?: string;
    reflussoSintomi?: string;
    // FLUENZA
    disfluenzeTipo?: string;
    aspettiCovert?: string;
    altriReperti?: string;
  };
  punteggiTest: {
    [key: string]: any;
  };
  noteAggiuntive?: string;
}

export interface ClinicalRecord {
  id: string;
  pazientePseudonimo: string;
  eta: string;
  areaClinica: string;
  sedeClinica: string;
  content: string;
  inputData: any;
  updatedAt: string;
  isFinalized: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface TestScoreResult {
  testType: string;
  testTitle: string;
  classe?: string;
  metriche: Record<string, any>;
  fasce?: Record<string, { code: string; label: string; badge: string; color: string }>;
  severita?: { label: string; badge: string; color: string; code?: string };
  formula?: string;
  quadroSintetico: string;
  sintesiClinica: string;
}

export interface FeedbackItem {
  id: string;
  type: 'chat' | 'report' | 'exercise' | 'materials';
  domain: string;
  prompt: string;
  aiResponse: string;
  rating: 'positive' | 'negative';
  stars: number;
  correction?: string;
  notes?: string;
  timestamp: string;
}

export interface FeedbackStats {
  count: number;
  positiveCount: number;
  negativeCount: number;
  approvalRate: number;
  recentEntries: FeedbackItem[];
}

function getBaseApiUrl(): string {
  return '/api/clinical';
}

export interface StreamReportOptions {
  notes?: any;
  evaluation?: EvaluationInput;
  onChunk: (token: string, accumulatedReport: string) => void;
  onComplete?: (finalReport: string) => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
}

export async function streamClinicalReport({
  notes,
  evaluation,
  onChunk,
  onComplete,
  onError,
  signal
}: StreamReportOptions): Promise<string> {
  let accumulatedReport = '';
  const payload = notes !== undefined ? { notes } : (evaluation || {});

  try {
    const response = await fetch(`${getBaseApiUrl()}/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify(payload),
      signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Impossibile avviare la generazione della relazione.`);
    }

    if (!response.body) {
      throw new Error('La risposta del server non contiene un body leggibile (ReadableStream).');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith(':')) continue;

        if (trimmed.startsWith('data: ')) {
          const rawData = trimmed.slice(6).trim();

          if (rawData === '[DONE]') {
            onComplete?.(accumulatedReport);
            return accumulatedReport;
          }

          try {
            const parsed = JSON.parse(rawData);
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.done && parsed.fullContent) {
              accumulatedReport = parsed.fullContent;
              onChunk('', accumulatedReport);
              onComplete?.(accumulatedReport);
              return accumulatedReport;
            }
            const token = parsed.token ?? parsed.chunk ?? '';
            if (token) {
              accumulatedReport += token;
              onChunk(token, accumulatedReport);
            }
          } catch (e) {
            // Ignora righe non-JSON
          }
        } else if (trimmed.startsWith('event: error')) {
          throw new Error('Il server middleware ha notificato un errore di inferenza.');
        }
      }
    }

    onComplete?.(accumulatedReport);
    return accumulatedReport;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    if (signal?.aborted) {
      return accumulatedReport;
    }
    onError?.(error);
    throw error;
  }
}

export const clinicalService = {
  async getStatus(): Promise<{ success: boolean; llm: ClinicalStatus; knowledgeBase: any }> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/status`);
      if (!res.ok) throw new Error('Errore stato');
      return await res.json();
    } catch (err: any) {
      return {
        success: false,
        llm: { online: false, models: [], activeModel: 'eleonora-logopedia-ai (Template Fallback)' },
        knowledgeBase: { version: '1.0.0', specializzazioni: ['SMOF', 'Linguaggio', 'DSA', 'Fluenza', 'Voce'] }
      };
    }
  },

  async getProtocols(): Promise<any> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/protocols`);
      if (!res.ok) throw new Error('Errore protocolli');
      const data = await res.json();
      return data.protocols || {};
    } catch (err) {
      return {};
    }
  },

  async generateReport(data: EvaluationInput): Promise<{ success: boolean; report: string }> {
    const res = await fetch(`${getBaseApiUrl()}/generate-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('Impossibile generare la relazione clinica');
    }
    return await res.json();
  },

  streamReport: streamClinicalReport,

  async generateExercises(data: {
    paziente: string;
    eta: string;
    area: string;
    obiettivi: string;
    interessi: string;
  }): Promise<{ success: boolean; exercises: string }> {
    const res = await fetch(`${getBaseApiUrl()}/generate-exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('Impossibile generare le schede esercizi');
    }
    return await res.json();
  },

  async generateMaterials(data: {
    tipo: 'COPPIE_MINIME' | 'STORIA_FONETICA' | 'LISTE_SILLABICHE_ARM' | 'MEMORY_TOMBOLA';
    target: string;
    posizione?: string;
    tema?: string;
    paziente?: string;
    eta?: string;
  }): Promise<{ success: boolean; materials: string }> {
    const res = await fetch(`${getBaseApiUrl()}/generate-materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      throw new Error('Impossibile generare il materiale riabilitativo');
    }
    return await res.json();
  },

  async chatWithAI(messages: { role: string; content: string }[]): Promise<{ success: boolean; reply: string }> {
    const res = await fetch(`${getBaseApiUrl()}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    if (!res.ok) {
      throw new Error('Impossibile comunicare con il Copilot Clinico AI');
    }
    return await res.json();
  },

  async saveReport(record: Partial<ClinicalRecord>): Promise<{ success: boolean; saved: ClinicalRecord }> {
    const res = await fetch(`${getBaseApiUrl()}/save-report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
    if (!res.ok) {
      throw new Error('Errore durante il salvataggio della relazione');
    }
    return await res.json();
  },

  async getSavedReports(): Promise<ClinicalRecord[]> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/reports`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.reports || [];
    } catch (e) {
      return [];
    }
  },

  async deleteReport(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/reports/${id}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  async getDatasetStats(): Promise<{ success: boolean; count: number; recentEntries: any[] }> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/dataset-stats`);
      if (!res.ok) return { success: false, count: 0, recentEntries: [] };
      return await res.json();
    } catch (e) {
      return { success: false, count: 0, recentEntries: [] };
    }
  },

  async saveFeedback(data: {
    type?: string;
    domain?: string;
    prompt?: string;
    aiResponse?: string;
    rating: 'positive' | 'negative';
    stars?: number;
    correction?: string;
    notes?: string;
  }): Promise<{ success: boolean; message: string; feedback?: FeedbackItem }> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  },

  async getFeedbackStats(): Promise<{ success: boolean } & FeedbackStats> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/feedback`);
      if (!res.ok) throw new Error('Errore feedback');
      return await res.json();
    } catch (e) {
      return {
        success: false,
        count: 0,
        positiveCount: 0,
        negativeCount: 0,
        approvalRate: 100,
        recentEntries: []
      };
    }
  },

  async deleteFeedback(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/feedback/${id}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  async getNormativeData(): Promise<any> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/normative-scores`);
      if (!res.ok) throw new Error('Errore caricamento tabelle normative');
      const data = await res.json();
      return data.norms || {};
    } catch (e) {
      return {};
    }
  },

  async calculateScore(testType: string, inputData: any): Promise<{ success: boolean; result?: TestScoreResult; message?: string }> {
    try {
      const res = await fetch(`${getBaseApiUrl()}/calculate-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testType, inputData })
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  },

  downloadDocument(filename: string, content: string, type: 'doc' | 'txt' | 'md' = 'doc') {
    let mimeType = 'text/plain;charset=utf-8';
    let fileExtension = '.txt';

    if (type === 'doc') {
      mimeType = 'application/msword';
      fileExtension = '.doc';

      const escapeHtml = (value: string): string =>
        value
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');

      // Helper per convertire il markdown in markup Word pulito ed elegante con tabelle reali
      const formatInlineForWord = (text: string) => {
        return escapeHtml(text)
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em>$1</em>')
          .replace(/\[\s*\]/g, '<span style="display:inline-block;width:14px;height:14px;border:1px solid #64748b;margin:0 4px;"></span>');
      };

      const convertToWordHtml = (md: string) => {
        const lines = md.split('\n');
        let html = '';
        let inTable = false;
        let tableHeaderDone = false;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) {
            if (inTable) {
              html += '</tbody></table>\n';
              inTable = false;
              tableHeaderDone = false;
            }
            html += '<p style="margin:4pt 0;">&nbsp;</p>\n';
            continue;
          }

          if (line === '---' || line === '***') {
            if (inTable) { html += '</tbody></table>\n'; inTable = false; tableHeaderDone = false; }
            html += '<hr style="border:none;border-top:1.5px solid #0d9488;margin:12pt 0;"/>\n';
            continue;
          }

          if (line.startsWith('# ')) {
            if (inTable) { html += '</tbody></table>\n'; inTable = false; tableHeaderDone = false; }
            html += `<h1 style="color:#0f766e;font-size:16pt;margin:14pt 0 6pt 0;font-family:'Calibri',sans-serif;">${formatInlineForWord(line.slice(2))}</h1>\n`;
            continue;
          }
          if (line.startsWith('## ')) {
            if (inTable) { html += '</tbody></table>\n'; inTable = false; tableHeaderDone = false; }
            html += `<h2 style="color:#0f172a;font-size:13pt;margin:10pt 0 4pt 0;border-bottom:1px solid #cbd5e1;padding-bottom:3pt;">${formatInlineForWord(line.slice(3))}</h2>\n`;
            continue;
          }
          if (line.startsWith('### ')) {
            if (inTable) { html += '</tbody></table>\n'; inTable = false; tableHeaderDone = false; }
            html += `<h3 style="color:#1e293b;font-size:11.5pt;margin:10pt 0 4pt 0;background-color:#f8fafc;padding:4pt 8pt;border-left:3px solid #0d9488;">${formatInlineForWord(line.slice(4))}</h3>\n`;
            continue;
          }

          if (line.startsWith('> ')) {
            if (inTable) { html += '</tbody></table>\n'; inTable = false; tableHeaderDone = false; }
            html += `<div style="background-color:#fefce8;border:1px solid #fef08a;padding:8pt 12pt;border-radius:4pt;margin:8pt 0;color:#854d0e;"><strong>${formatInlineForWord(line.slice(2))}</strong></div>\n`;
            continue;
          }

          // Riconoscimento tabelle Markdown
          if (line.startsWith('|') && line.endsWith('|')) {
            const rawCells = line.slice(1, -1).split('|').map(c => c.trim());
            // Riga separatore |---|---|
            if (rawCells.every(c => /^:?-+:?$/.test(c))) {
              tableHeaderDone = true;
              continue;
            }

            if (!inTable) {
              inTable = true;
              tableHeaderDone = false;
              html += '<table style="width:100%;border-collapse:collapse;margin:12pt 0;font-size:10pt;font-family:\'Calibri\',sans-serif;">\n';
            }

            if (!tableHeaderDone) {
              html += '<thead><tr style="background-color:#f1f5f9;color:#0f172a;font-weight:bold;">\n';
              rawCells.forEach(c => {
                html += `<th style="border:1px solid #cbd5e1;padding:6pt 8pt;text-align:left;">${formatInlineForWord(c)}</th>\n`;
              });
              html += '</tr></thead><tbody>\n';
              tableHeaderDone = true;
            } else {
              html += '<tr>\n';
              rawCells.forEach(c => {
                html += `<td style="border:1px solid #cbd5e1;padding:6pt 8pt;vertical-align:middle;">${formatInlineForWord(c)}</td>\n`;
              });
              html += '</tr>\n';
            }
            continue;
          }

          if (inTable) {
            html += '</tbody></table>\n';
            inTable = false;
            tableHeaderDone = false;
          }

          if (line.startsWith('- ') || line.startsWith('* ')) {
            html += `<div style="margin:3pt 0 3pt 16pt;">• ${formatInlineForWord(line.replace(/^[-*]\s+/, ''))}</div>\n`;
            continue;
          }

          if (/^\d+\.\s/.test(line)) {
            html += `<div style="margin:3pt 0 3pt 16pt;"><strong>${line.match(/^\d+\./)![0]}</strong> ${formatInlineForWord(line.replace(/^\d+\.\s*/, ''))}</div>\n`;
            continue;
          }

          html += `<p style="margin:4pt 0;line-height:1.5;">${formatInlineForWord(line)}</p>\n`;
        }

        if (inTable) {
          html += '</tbody></table>\n';
        }

        return html;
      };

      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>${escapeHtml(filename)}</title>
        <style>
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; margin: 2cm; }
          h1 { font-size: 16pt; color: #0d9488; text-align: left; }
          h2 { font-size: 13pt; color: #0f172a; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
          h3 { font-size: 11pt; color: #334155; }
          p { margin: 6pt 0; }
          .header { text-align: left; margin-bottom: 16pt; border-bottom: 2px solid #0d9488; padding-bottom: 8pt; font-size: 10pt; color: #475569; }
          table { width: 100%; border-collapse: collapse; margin: 12pt 0; }
          th, td { border: 1px solid #cbd5e1; padding: 6pt 8pt; text-align: left; }
          th { background-color: #f1f5f9; font-weight: bold; }
        </style>
        </head>
        <body>
          <div class="header">
            <strong style="color:#0f766e;font-size:12pt;">Studio di Logopedia — Dott.ssa Eleonora Mariotti</strong><br/>
            Logopedista • Master I Livello in Motricità Orofacciale (110/110 con Lode)<br/>
            Iscritta all'Albo TSRM-PSTRP Ancona (n. 49) • P.IVA: 02062460429 • Tel: +39 366 146 0520
          </div>
          <div>${convertToWordHtml(content)}</div>
        </body>
        </html>
      `;
      const blob = new Blob(['\ufeff' + htmlContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}${fileExtension}`;
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}${type === 'md' ? '.md' : '.txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  }
};
