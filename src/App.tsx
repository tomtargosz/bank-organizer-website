import React from 'react';
import './App.css';

type BankItem = {
  position: number;
  id: number;
  name: string;
};

function App(): React.ReactElement {
  const [bankContents, setBankContents] = React.useState<BankItem[]>([
    {
      position: 0,
      id: 4151,
      name: 'Abyssal whip'
    },
    {
      position: 1,
      id: 1163,
      name: 'Rune full helm'
    },
    {
      position: 6,
      id: 10372,
      name: 'Zamorak chaps'
    },
    {
      position: 12,
      id: 10374,
      name: 'Zamorak coif'
    }
  ]);
  const [draggedItem, setDraggedItem] = React.useState<BankItem | null>(null);
  const [activeSpot, setActiveSpot] = React.useState<number | null>(null);

  const setActiveSpotWhenNoDraggedItem = (i: number | null): void => {
    draggedItem != null && setActiveSpot(i);
  };

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 36px)',
          gridTemplateRows: 'repeat(100, 32px)'
        }}>
        {Array.from(Array(800)).map((_, i) => {
          const item = bankContents.find((content) => content.position === i);
          const isActive = activeSpot === i;

          return (
            <div
              key={i}
              className="bankSlot"
              draggable
              onDragStart={() => item != null && setDraggedItem(item)}
              onDrop={(e) => {
                if (draggedItem == null) {
                  console.error('No dragged item in onDrop');
                  return;
                }

                if (item != null) {
                  // switch the item positions
                  setBankContents(
                    bankContents
                      .filter((i) => i.id !== draggedItem?.id && i.id !== item.id)
                      .concat([
                        { ...draggedItem, position: i },
                        { ...item, position: draggedItem.position }
                      ])
                  );
                } else {
                  setBankContents(
                    bankContents
                      .filter((i) => i.id !== draggedItem.id)
                      .concat([{ ...draggedItem, position: i }])
                  );
                }

                setActiveSpotWhenNoDraggedItem(i);
                setDraggedItem(null);
              }}
              onMouseOver={() => setActiveSpotWhenNoDraggedItem(i)}
              onMouseOut={() => setActiveSpotWhenNoDraggedItem(i)}
              onDragOver={(e) => {
                e.preventDefault();
                setActiveSpotWhenNoDraggedItem(i);
              }}
              style={{
                outline: draggedItem != null && isActive ? '1px solid red' : ''
              }}>
              {item != null && (
                <img
                  src={`https://raw.githubusercontent.com/osrsbox/osrsbox-db/master/docs/items-icons/${item.id}.png`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
