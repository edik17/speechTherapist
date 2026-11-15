import React from 'react';
import { Building2, MapPin, ShieldCheck } from 'lucide-react';
import './FacilityIdentityBanner.scss';

export interface FacilityIdentityBannerProps {
  /** Tipologia della struttura (es. Centro Multispecialistico) */
  facilityType: string;
  /** Nome proprio del centro o studio da mettere in risalto */
  facilityName: string;
  /** Indirizzo completo della sede */
  address: string;
  /** Eventuale dicitura ufficiale di accreditamento */
  accreditation?: string;
  className?: string;
}

/**
 * Banner identitario Liquid Glass per mettere in risalto nome, tipologia, indirizzo
 * ed eventuale accreditamento di ciascun centro clinico.
 */
export function FacilityIdentityBanner({
  facilityType,
  facilityName,
  address,
  accreditation,
  className = '',
}: FacilityIdentityBannerProps) {
  return (
    <div className={`facility-identity-wrapper ${className}`.trim()}>
      <div className="facility-identity-box">
        <div className="facility-emblem" aria-hidden="true">
          <Building2 size={22} />
        </div>
        <div className="facility-identity-text">
          <span className="facility-type-label">{facilityType}</span>
          <h2 className="facility-title">{facilityName}</h2>
          <p className="facility-address">
            <MapPin size={14} className="address-pin-icon" />
            <span>{address}</span>
          </p>
        </div>
      </div>

      {accreditation && (
        <div className="facility-accreditation">
          <ShieldCheck size={16} className="accreditation-icon" />
          <span>{accreditation}</span>
        </div>
      )}
    </div>
  );
}
