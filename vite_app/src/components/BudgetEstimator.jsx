import React, { useState, useEffect } from 'react';
import { Calculator, Calendar, Users, MapPin, Music, Camera, UserCheck, Printer } from 'lucide-react';
import './BudgetEstimator.css';




  const [breakdown, setBreakdown] = useState([]);

  const calculateBudget = () => {
    const baseVenueCost = 2000;
    const perPersonCost = 75;
    const multiplier = TIER_MULTIPLIERS[details.budgetTier];

    const newBreakdown = [
      {
        category: 'Venue',
        amount: baseVenueCost * multiplier * (details.duration / 4),
        description: `${details.duration} hours at ${details.locationType} venue`
      },
      {
        category: 'Catering',
        amount: details.guestCount * perPersonCost * multiplier * 
          (details.mealService === 'Plated' ? 1.3 : details.mealService === 'Cocktail' ? 0.7 : 1) *
          (details.includesAlcohol ? 1.4 : 1),
        description: `${details.mealService} service for ${details.guestCount} guests${details.includesAlcohol ? ' (including alcohol)' : ''}`
      }
    ];

    if (details.needsDecoration) {
      newBreakdown.push({
        category: 'Decoration',
        amount: 1500 * multiplier,
        description: 'Venue decoration and setup'
      });
    }

    if (details.needsMusic) {
      newBreakdown.push({
        category: 'Entertainment',
        amount: 1200 * multiplier,
        description: 'DJ and sound system'
      });
    }

    if (details.needsPhotography) {
      newBreakdown.push({
        category: 'Photography',
        amount: 2000 * multiplier,
        description: 'Event photography and video coverage'
      });
    }

    if (details.needsPrinting) {
      newBreakdown.push({
        category: 'Printing',
        amount: details.guestCount * 5 * multiplier,
        description: 'Invitations and event materials'
      });
    }


    setBreakdown(newBreakdown);
  };

  useEffect(() => {
    calculateBudget();
  }, [details]);

  const total = breakdown.reduce((sum, item) => sum + item.amount, 0);

  const handleNumberInput = (e, field) => {
    const value = e.target.value === '' ? 0 : Math.max(0, parseInt(e.target.value) || 0);
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const renderFormSection = (title, icon, children) => (
    <div className="section-container">
      <div className="section-header">
        {icon}
        <h3 className="section-title">{title}</h3>
      </div>
      <div className="section-content">{children}</div>
    </div>
  );

  return (
    
    <div className="budget-estimator-container">
      
      <div className="budget-grid">
        <div className="form-column">
          {renderFormSection("Basic Information", <Calculator className="icon" />, (
            <>
              <div>
                <label className="input-label">Event Name</label>
                <input
                  type="text"
                  className="input-field"
                  value={details.eventName}
                  onChange={(e) => setDetails({ ...details, eventName: e.target.value })}
                />
              </div>

           

            
            </>
          ))}

          {renderFormSection("Venue & Location", <MapPin className="icon" />, (
            <>
              <div className="grid-2">
             
             
              </div>
              <div className="checkbox-group">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={details.needsDecoration}
                    onChange={(e) => setDetails({ ...details, needsDecoration: e.target.checked })}
                  />
                  <span className="checkbox-label">Need Decoration</span>
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={details.needsParking}
                    onChange={(e) => setDetails({ ...details, needsParking: e.target.checked })}
                  />
                  <span className="checkbox-label">Parking Required</span>
                </label>
              </div>
            </>
          ))}

          {renderFormSection("Food & Beverages", <Users className="icon" />, (
        
          ))}

          {renderFormSection("Additional Services", <Music className="icon" />, (
            <>
              <div className="grid-3">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={details.needsMusic}
                    onChange={(e) => setDetails({ ...details, needsMusic: e.target.checked })}
                  />
                  <span className="checkbox-label">Music/DJ</span>
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={details.needsPhotography}
                    onChange={(e) => setDetails({ ...details, needsPhotography: e.target.checked })}
                  />
                  <span className="checkbox-label">Photography/Video</span>
                </label>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={details.needsStaff}
                    onChange={(e) => setDetails({ ...details, needsStaff: e.target.checked })}
                  />
                  <span className="checkbox-label">Event Staff</span>
                </label>
              </div>
              <div>
                <label className="input-label">Special Features</label>
                <textarea
                  className="textarea-field"
                  rows={3}
                  value={details.specialFeatures}
                  onChange={(e) => setDetails({ ...details, specialFeatures: e.target.value })}
                  placeholder="List any special features needed (lighting, stage, dance floor, etc.)"
                />
              </div>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={details.needsPrinting}
                  onChange={(e) => setDetails({ ...details, needsPrinting: e.target.checked })}
                />
                <span className="checkbox-label">Need Printed Materials</span>
              </label>
            </>
          ))}

          {renderFormSection("Budget Preference", <Calculator className="icon" />, (
            <div className="grid-4">
              {BUDGET_TIERS.map((tier) => (
                <label
                  key={tier}
                  className={`budget-tier-option ${details.budgetTier === tier ? 'active' : ''}`}
                >
                  <input
                    type="radio"
                    name="budgetTier"
                    value={tier}
                    checked={details.budgetTier === tier}
                    onChange={(e) => setDetails({ ...details, budgetTier: e.target.value })}
                    style={{ display: 'none' }}
                  />
                  <span className="budget-tier-label">{tier}</span>
                </label>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}