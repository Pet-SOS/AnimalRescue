import React from 'react';
import { TI18n } from '../../../../i18n';

export const antiparasiticNeeds: {
  subtitle: { key: string; default: string };
  data: { [key: string]: string };
}[] = [
  {
    subtitle: {
      key: 'antiparasiticNeedsSubtitle1',
      default: 'Протиглисні',
    },
    data: {
      antiparasiticNeedsList1: 'для цуценят - Прококс, Празицид',
      antiparasiticNeedsList2: 'для кошенят - Празицид, Мільбемакс',
      antiparasiticNeedsList3: 'для котів - Енвайр, Дронтал, Мільбемакс',
      antiparasiticNeedsList4: 'для собак - Енвайр, Каніквантель',
    },
  },
  {
    subtitle: {
      key: 'antiparasiticNeedsSubtitle2',
      default: 'Протиблошині',
    },
    data: {
      antiparasiticNeedsList5:
        'собаки і коти - Вітомакс голд, Адвантікс, Адвантейдж',
      antiparasiticNeedsList6:
        'кошенята, цуценята - Больфо спрей, Фіпроніл, Фіприст',
    },
  },
  {
    subtitle: {
      key: 'antiparasiticNeedsSubtitle3',
      default: 'Комплексні (від бліх і глистів)',
    },
    data: {
      antiparasiticNeedsList7: 'Празицид-комплекс',
      antiparasiticNeedsList8: 'Стронгхолд',
    },
  },
  {
    subtitle: {
      key: 'antiparasiticNeedsSubtitle4',
      default: 'Від кліщів',
    },
    data: {
      antiparasiticNeedsList9: 'Сімпаріка',
    },
  },
];

export const AntiparasiticNeedsList: React.FC = () => (
  <ul>
    {antiparasiticNeeds.map((item, index) => (
      <li key={index}>
        <span className="subtitle">
          <TI18n keyStr={item.subtitle.key} default={item.subtitle.default} />:
        </span>
        <ul className="dots-list">
          {Object.keys(item.data).map((key, index) => {
            if (item.data.hasOwnProperty(key)) {
              return (
                <li key={index}>
                  <TI18n keyStr={key} default={item.data[key]} />
                </li>
              );
            }
          })}
        </ul>
      </li>
    ))}
  </ul>
);
