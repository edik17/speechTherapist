const fs = require('fs');
const path = require('path');
const llmClient = require('../../ai-engine/llm_client');
const testScorer = require('../../ai-engine/test_scorer');

const DATA_FILE = path.join(__dirname, '..', 'data', 'clinical_records.json');
const FINETUNE_FILE = path.join(__dirname, '..', '..', 'ai-engine', 'finetune', 'dataset_clinico.jsonl');
const FEEDBACK_FILE = path.join(__dirname, '..', '..', 'ai-engine', 'finetune', 'feedback_dataset.jsonl');
const PROTOCOLLI_FILE = path.join(__dirname, '..', '..', 'ai-engine', 'knowledge-base', 'protocolli_clinici.json');

// Inizializza file dati se non esiste
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ reports: [], evaluations: [] }, null, 2), 'utf-8');
}

function readRecords() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    return { reports: [], evaluations: [] };
  }
}

function writeRecords(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Controller Clinico
exports.getEngineStatus = async (req, res) => {
  try {
    const status = await llmClient.checkOllamaStatus();
    res.json({
      success: true,
      llm: status,
      knowledgeBase: {
        version: '1.0.0',
        specializzazioni: ['SMOF (Motricità Orofacciale)', 'Linguaggio & Fonologia', 'DSA (Metodo ARM / Prove MT)', 'Fluenza', 'Voce']
      }
    });
  } catch (error) {
    console.error('[Clinical Controller] getEngineStatus error:', error.message);
    res.status(500).json({ success: false, message: 'Errore nel recupero dello stato del motore AI.' });
  }
};

exports.getProtocols = (req, res) => {
  try {
    if (fs.existsSync(PROTOCOLLI_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROTOCOLLI_FILE, 'utf-8'));
      return res.json({ success: true, protocols: data });
    }
    res.json({ success: true, protocols: {} });
  } catch (error) {
    console.error('[Clinical Controller] getProtocols error:', error.message);
    res.status(500).json({ success: false, message: 'Errore nel caricamento dei protocolli clinici.' });
  }
};

exports.getNormativeData = (req, res) => {
  try {
    const norms = testScorer.loadNormativeData();
    res.json({ success: true, norms });
  } catch (error) {
    console.error('[Clinical Controller] getNormativeData error:', error.message);
    res.status(500).json({ success: false, message: 'Errore nel caricamento delle tabelle normative.' });
  }
};

exports.calculateScore = (req, res) => {
  try {
    const { testType, inputData } = req.body;
    if (!testType || !inputData) {
      return res.status(400).json({ success: false, message: 'Parametri testType e inputData obbligatori.' });
    }

    const result = testScorer.scoreTest(testType, inputData);
    res.json({ success: true, result });
  } catch (error) {
    console.error('[Clinical Controller] calculateScore error:', error.message);
    res.status(400).json({ success: false, message: 'Parametri non validi per il calcolo del punteggio.' });
  }
};

exports.generateReport = async (req, res) => {
  try {
    const rawData = req.body || {};
    if (!rawData || (typeof rawData === 'object' && Object.keys(rawData).length === 0)) {
      return res.status(400).json({ success: false, message: 'Dati valutazione o appunti mancanti.' });
    }

    // Normalizzazione dati: supporta sia { notes } sia l'oggetto valutazione completo
    const evaluationData = rawData.notes ? { ...rawData, notes: rawData.notes } : rawData;

    // Se il client richiede streaming (Header Accept: text/event-stream o query/body stream: true)
    const wantsStream = 
      req.headers.accept === 'text/event-stream' || 
      req.query.stream === 'true' || 
      rawData.stream === true;

    if (wantsStream) {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'
      });
      res.flushHeaders?.();

      // Heartbeat di apertura SSE
      res.write(': sse-connection-open\n\n');

      const abortController = new AbortController();
      req.on('close', () => {
        abortController.abort();
        res.end();
      });

      const onChunk = (chunk) => {
        res.write(`data: ${JSON.stringify({ token: chunk, chunk })}\n\n`);
      };

      try {
        const fullContent = await llmClient.generateReport(evaluationData, onChunk, abortController.signal);
        res.write('data: [DONE]\n\n');
        res.write(`data: ${JSON.stringify({ done: true, fullContent })}\n\n`);
        return res.end();
      } catch (streamErr) {
        if (abortController.signal.aborted) return;
        console.error('[Clinical Controller] Errore stream:', streamErr.message);
        res.write(`event: error\ndata: ${JSON.stringify({ error: streamErr.message })}\n\n`);
        return res.end();
      }
    }

    // Risposta JSON classica sincrona
    const reportMarkdown = await llmClient.generateReport(evaluationData);
    res.json({
      success: true,
      report: reportMarkdown,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Clinical Controller] Errore generazione relazione:', error);
    res.status(500).json({ success: false, message: 'Errore durante la generazione della relazione.' });
  }
};

exports.generateExercises = async (req, res) => {
  try {
    const exerciseData = req.body;
    const content = await llmClient.generateExercises(exerciseData);
    res.json({
      success: true,
      exercises: content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore durante la generazione degli esercizi.' });
  }
};

exports.generateMaterials = async (req, res) => {
  try {
    const materialData = req.body;
    const content = await llmClient.generateMaterials(materialData);
    res.json({
      success: true,
      materials: content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore durante la generazione dei materiali riabilitativi.' });
  }
};

exports.chat = async (req, res) => {
  try {
    const { messages = [], message = '' } = req.body;
    let chatHistory = Array.isArray(messages) ? messages : [];
    if (chatHistory.length === 0 && message) {
      chatHistory = [{ role: 'user', content: message }];
    }

    const reply = await llmClient.chat(chatHistory);
    res.json({
      success: true,
      reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Clinical Controller] Errore chat:', error);
    res.status(500).json({ success: false, message: 'Errore durante la conversazione con il Copilot AI.' });
  }
};

exports.saveReport = (req, res) => {
  try {
    const { id, pazientePseudonimo, eta, areaClinica, sedeClinica, content, inputData, isFinalized } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: 'Contenuto relazione mancante.' });
    }

    const records = readRecords();
    const recordId = id || `rep_${Date.now()}`;
    const newRecord = {
      id: recordId,
      pazientePseudonimo: pazientePseudonimo || 'Paziente',
      eta: eta || '',
      areaClinica: areaClinica || 'SMOF',
      sedeClinica: sedeClinica || 'Ancona',
      content,
      inputData: inputData || {},
      updatedAt: new Date().toISOString(),
      isFinalized: !!isFinalized
    };

    const existingIdx = records.reports.findIndex(r => r.id === recordId);
    if (existingIdx >= 0) {
      records.reports[existingIdx] = newRecord;
    } else {
      records.reports.unshift(newRecord);
    }

    writeRecords(records);

    // Se la relazione è finalizzata dalla logopedista, la aggiungiamo al dataset per il fine-tuning
    if (isFinalized && inputData) {
      try {
        const datasetEntry = {
          instruction: "Sei l'assistente clinico della Dott.ssa Eleonora Mariotti. Redigi la relazione logopedica ufficiale in base ai dati della valutazione clinica.",
          input: JSON.stringify(inputData),
          output: content,
          timestamp: new Date().toISOString()
        };
        fs.appendFileSync(FINETUNE_FILE, JSON.stringify(datasetEntry) + '\n', 'utf-8');
      } catch (err) {
        console.warn('[Clinical Controller] Impossibile aggiornare dataset fine-tuning:', err.message);
      }
    }

    res.json({ success: true, saved: newRecord });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore nel salvataggio della relazione.' });
  }
};

exports.getReports = (req, res) => {
  try {
    const records = readRecords();
    res.json({ success: true, reports: records.reports || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore nel recupero delle relazioni.' });
  }
};

exports.deleteReport = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: 'ID relazione mancante.' });

    const records = readRecords();
    const initialLen = records.reports.length;
    records.reports = records.reports.filter(r => r.id !== id);

    if (records.reports.length === initialLen) {
      return res.status(404).json({ success: false, message: 'Relazione non trovata.' });
    }

    writeRecords(records);
    res.json({ success: true, message: 'Relazione eliminata con successo.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore nell\'eliminazione della relazione.' });
  }
};

exports.getDatasetStats = (req, res) => {
  try {
    if (!fs.existsSync(FINETUNE_FILE)) {
      return res.json({ success: true, count: 0, entries: [] });
    }
    const lines = fs.readFileSync(FINETUNE_FILE, 'utf-8').split('\n').filter(l => l.trim() !== '');
    const entries = lines.slice(-10).map(l => {
      try { return JSON.parse(l); } catch(e) { return null; }
    }).filter(Boolean);

    res.json({
      success: true,
      count: lines.length,
      recentEntries: entries
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore nel recupero statistiche dataset.' });
  }
};

// ==========================================
// SISTEMA DI FEEDBACK & APPRENDIMENTO CONTINUO
// ==========================================

exports.saveFeedback = (req, res) => {
  try {
    const {
      type = 'chat',
      domain = 'GENERALE',
      prompt = '',
      aiResponse = '',
      rating = 'positive',
      stars = 5,
      correction = '',
      notes = ''
    } = req.body;

    const feedbackEntry = {
      id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      domain: (domain || 'GENERALE').toUpperCase(),
      prompt: typeof prompt === 'string' ? prompt : JSON.stringify(prompt),
      aiResponse: typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse),
      rating: rating === 'negative' ? 'negative' : 'positive',
      stars: Number(stars) || (rating === 'negative' ? 2 : 5),
      correction: correction ? correction.trim() : '',
      notes: notes ? notes.trim() : '',
      timestamp: new Date().toISOString()
    };

    fs.appendFileSync(FEEDBACK_FILE, JSON.stringify(feedbackEntry) + '\n', 'utf-8');

    // Se c'è una correzione clinica esplicita o rating positivo, registriamo la coppia SFT
    if (correction && prompt) {
      const sftEntry = {
        instruction: `Sei l'assistente clinico logopedico della Dott.ssa Eleonora Mariotti. Dominio: ${domain}.`,
        input: prompt,
        output: correction,
        rejectedOutput: aiResponse,
        rating: 'corrected',
        timestamp: new Date().toISOString()
      };
      fs.appendFileSync(FINETUNE_FILE, JSON.stringify(sftEntry) + '\n', 'utf-8');
    }

    res.json({
      success: true,
      message: 'Feedback registrato con successo nel ciclo di apprendimento!',
      feedback: feedbackEntry
    });
  } catch (error) {
    console.error('[Clinical Controller] Errore salvataggio feedback:', error);
    res.status(500).json({ success: false, message: 'Impossibile salvare il feedback.' });
  }
};

exports.getFeedbackStats = (req, res) => {
  try {
    if (!fs.existsSync(FEEDBACK_FILE)) {
      return res.json({
        success: true,
        count: 0,
        positiveCount: 0,
        negativeCount: 0,
        approvalRate: 100,
        recentEntries: []
      });
    }

    const lines = fs.readFileSync(FEEDBACK_FILE, 'utf-8').split('\n').filter(l => l.trim() !== '');
    const entries = lines.map(l => {
      try { return JSON.parse(l); } catch(e) { return null; }
    }).filter(Boolean);

    const positiveCount = entries.filter(e => e.rating === 'positive').length;
    const negativeCount = entries.filter(e => e.rating === 'negative').length;
    const approvalRate = entries.length > 0 
      ? Math.round((positiveCount / entries.length) * 100) 
      : 100;

    res.json({
      success: true,
      count: entries.length,
      positiveCount,
      negativeCount,
      approvalRate,
      recentEntries: entries.slice(-15).reverse()
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore nel recupero statistiche feedback.' });
  }
};

exports.deleteFeedback = (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !fs.existsSync(FEEDBACK_FILE)) {
      return res.status(404).json({ success: false, message: 'Feedback non trovato.' });
    }

    const lines = fs.readFileSync(FEEDBACK_FILE, 'utf-8').split('\n').filter(l => l.trim() !== '');
    const kept = [];
    let found = false;

    for (const line of lines) {
      try {
        const item = JSON.parse(line);
        if (item.id === id) {
          found = true;
          continue;
        }
        kept.push(line);
      } catch (e) {
        kept.push(line);
      }
    }

    if (!found) {
      return res.status(404).json({ success: false, message: 'Feedback non trovato.' });
    }

    fs.writeFileSync(FEEDBACK_FILE, kept.length > 0 ? kept.join('\n') + '\n' : '', 'utf-8');
    res.json({ success: true, message: 'Feedback rimosso con successo.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore eliminazione feedback.' });
  }
};
