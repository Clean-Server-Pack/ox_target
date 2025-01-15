
import { BackgroundImage, Flex } from '@mantine/core';
import { useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { internalEvent } from '../../utils/internalEvent';
import { OptionProps } from './Option';
import Eye from './Eye';
import Options from './Options';
import { isEnvBrowser } from '../../utils/misc';






export default function MyComponent() {
  const [ opened, setOpened ] = useState(false);

  const [targetActive, setTargetActive] = useState(false);
  const [ options, setOptions ] = useState<OptionProps[]>([
    {
      label: 'Option 1',
      icon: 'fas fa-eye',
      type: 'zones',
      targetId: 1,
      zoneId: 1,
    },

  ]);

  useNuiEvent('leftTarget', () => { 
    setTargetActive(false);
  });

  useNuiEvent('visible', (data: {state: boolean}) => {
    setOpened(data.state);
    setTargetActive(false);
    setOptions([]);
  });

  useNuiEvent('setTarget', (data: {
    options?: {
      [type: string]: OptionProps[];
    };

    zones?: OptionProps[][];


  }) => {
    setTargetActive(true);
    setOptions([]);
    if (data?.options) {
      for (const type in data.options) {
        data.options[type].forEach((data, id) => {
          const targetId = id + 1;
          const targetType = type;

          setOptions((prev: OptionProps[]) => {
            const newOptions = [...prev];
            newOptions.push({ ...data, targetId, type: targetType });
            return newOptions;  
          });
        });
      }
    }

    if (data?.zones) {
      for (let i = 0; i < data.zones.length; i++) {
        data.zones[i].forEach((data, id) => {
          const targetId = id + 1
          const zoneId = i + 1
          const targetType = "zones"

          setOptions((prev: OptionProps[]) => {
            const newOptions = [...prev];
            newOptions.push({ ...data, targetId, zoneId, type: targetType });
            return newOptions;
          });
        });
      }
    }
  });

  const Target = function() {
    return (
      <Flex
        pos='absolute'
        top='50%'
        left='50%'
        gap='xs'
        style={{
          userSelect: 'none',
        }}
      >
        <Eye
          targetActive={targetActive}
        />
        {targetActive&& (
          <Options
            options={options}
          />
        )}
      </Flex>
      )
  }
 
  return (
    <>
      {opened ? 
        isEnvBrowser() ? (
          <BackgroundImage
            w='100vw'
            h='100vh'
            style={{
              overflow: 'hidden',
              userSelect: 'none',
            }}
            src="https://i.ytimg.com/vi/TOxuNbXrO28/maxresdefault.jpg"
          >
            <Target />
          </BackgroundImage>  
        ) : (
          <Target />
        )
      : <> </>}
    </>
  );
}












internalEvent([
  {
    action: 'visible',
    data: {
      state: true,
    }
  },
  {
    action: 'setTarget',
    data:{
      options: {
        'zones': [
          {
            label: 'Option 1',
            icon: 'fas fa-eye',
          },
          {
            label: 'Option 2',
            icon: 'fas fa-eye',
          },
          {
            label: 'Option 3',
            icon: 'fas fa-eye',
          },
        ],

      }
    }
  },


])