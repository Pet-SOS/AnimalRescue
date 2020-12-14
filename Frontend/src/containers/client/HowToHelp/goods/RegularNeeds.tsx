import React from 'react';
import { TI18n } from '../../../../i18n';

export const regularNeeds: { [key: string]: string } = {
  regularNeedsList1: 'Корм вологий для котів і собак. Підійде будь-якої фірми.',
  regularNeedsList2: 'Корм Royal Canin recovery',
  regularNeedsList3: 'Корм сухий для собак і котів фірми Клуб 4 лапи',
  regularNeedsList4:
    'Сухе молоко для новонароджених цуценят і кошенят (Royal Canin, Canine)',
  regularNeedsList5: 'Пелюшки одноразові',
  regularNeedsList6: 'Памперси 5 розмір',
  regularNeedsList7: 'Поводки 5 - 10 метрів, ошийники, шлейки',
  regularNeedsList8: 'Будки для собак',
  regularNeedsList9: 'Солома',
  regularNeedsList10: 'Дрова',
  regularNeedsList11: 'Наповнювач',
  regularNeedsList12: 'Миючі засоби для підлоги (дезінфектори)',
};

export const RegularNeedsList: React.FC = () => (
  <ul className="dots-list">
    {Object.keys(regularNeeds).map((key, index) => {
      if (regularNeeds.hasOwnProperty(key)) {
        return (
          <li key={index}>
            <TI18n keyStr={key} default={regularNeeds[key]} />
          </li>
        );
      }
    })}
  </ul>
);
