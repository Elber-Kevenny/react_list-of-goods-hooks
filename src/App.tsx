import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = 'default',
  Reverse = 'reverse',
  Reset = 'reset',
}

interface ItemType {
  id: number;
  name: string;
}
interface Good {
  id: number;
  name: string;
} // usar interface para definir a forma de um objeto
interface Props {
  goods: Good[];
}
/* em initialgoods estou criando um array de objetos com id e name para depois
fazer o map no initialgoods para gerar uma lista dinamica de itens */
const initialGoods = goodsFromServer.map((name, i) => ({ id: i + 1, name }));
/* initialGoods = [{id: 1, name: 'Duplimgs'}
                  {id: 2, name: 'carrot'}] */
/*React(chamei a biblioteca do react).FC(componente da função) Props é um tipo generico */
export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good.id} data-cy="Good">
        {good.name}
      </li>
    ))}
  </ul>
);

export const App: React.FC = () => {
  const [goods, setGoods] = useState<ItemType[]>(initialGoods);
  const [isSortedType, setIsSortedType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const isOriginalOrder = (arr1: Good[], arr2: Good[]) => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) => item === arr2[index]);
  };

  const handleToggleReverse = () => {
    setIsReversed(prev => !prev);
    setGoods(prev => [...prev].reverse());
  };

  const handleSortAlphabetically = () => {
    const sorted = [...goods].sort((a, b) => a.name.localeCompare(b.name));
    // sorted é uma variável local da função sortAlphabeticaly
    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setIsSortedType(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    const sorted = [...goods].sort((a, b) => b.name.length - a.name.length);

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setIsSortedType(SortType.Length);
  };

  const handleReset = () => {
    setGoods(initialGoods);
    setIsSortedType(SortType.Reset);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            isSortedType === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button type="button" className={isSortedType === SortType.Length ? 'button is-success' : 'button is-success is-light'

        }
          onClick={handleSortByLength}
        >

          Sort by length
        </button>
        <button type="button" className={isReversed ? 'button is-warning' : 'button is-warning is-light'}
        onClick={handleToggleReverse}>
          Reverse
        </button>
        {!isOriginalOrder(goods, initialGoods) && (
          <button type="button" className={isSortedType === SortType.Reset ? 'button is-danger' : 'button is-danger is-light'}
          onClick={handleReset}>
          Reset
        </button>
        )}

      </div>
      <GoodList goods={goods} />
    </div>
  );
};
