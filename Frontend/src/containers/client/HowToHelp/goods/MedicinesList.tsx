import React from 'react';
import { TI18n } from '../../../../i18n';

export const medicinesNeeds: { [key: string]: string } = {
  medicinesNeedsList1: 'Розчин Рінгера',
  medicinesNeedsList2: 'Глюкоза 5%',
  medicinesNeedsList3: 'Натрію хлорид',
  medicinesNeedsList4: 'Цефтріаксон 1г',
  medicinesNeedsList5: 'Катозал',
  medicinesNeedsList6: 'Левоміколь',
  medicinesNeedsList7: 'Окситетрациклінова мазь',
  medicinesNeedsList8: 'Ципрофарм',
  medicinesNeedsList9: 'Перекись',
  medicinesNeedsList10: 'Хлоргексидин',
  medicinesNeedsList11: 'Бинти',
  medicinesNeedsList12: 'Катетери внутрішньовенні (сині, рожеві)',
  medicinesNeedsList13: 'Шприци 2мл',
  medicinesNeedsList14: 'Одноразові рукавички (розмір S, M)',
};

export const MedicinesList: React.FC = () => (
  <ul className="dots-list">
    {Object.keys(medicinesNeeds).map((key, index) => {
      if (medicinesNeeds.hasOwnProperty(key)) {
        return (
          <li key={index}>
            <TI18n keyStr={key} default={medicinesNeeds[key]} />
          </li>
        );
      }
    })}
  </ul>
);
