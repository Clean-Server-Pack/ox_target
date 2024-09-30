import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Text, useMantineTheme } from "@mantine/core";
import colorWithAlpha from "../../utils/colorWithAlpha";
import { fetchNui } from "../../utils/fetchNui";
import { useState } from "react";
import { useHover } from "@mantine/hooks";

export type OptionProps = {
  hide?: boolean;
  label: string;
  icon: string;
  iconColor?: string;
} & OptionExtraProps;

export type OptionExtraProps = {
  type: string;
  targetId: number;
  zoneId: number;
}


export default function Option(props:OptionProps){
  const {hovered, ref} = useHover()
  const theme = useMantineTheme();
  const [pointerEvents, setPointerEvents] = useState<boolean>(true);
  if (props.hide) {
    return null;
  }
  return (
    <Flex
      ref={ref}
      align='center'
      gap='xs'
      p='0.6vh'
      bg='rgba(0,0,0,0.5)'
      style={{
        transition: 'all ease-in-out 0.2s',
        borderRadius: theme.radius.xs,
        cursor: 'pointer',
        pointerEvents: pointerEvents ? 'auto' : 'none',
        outline: hovered? `2px solid ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'none',
        boxShadow:  hovered ? `inset 0 0 0.9vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'inset 0 0 10px rgba(0,0,0,0.6)',
      }}
      onClick={() => {
        
        setPointerEvents(false);
        setTimeout(() => {
          fetchNui("select", [props.type, props.targetId, props.zoneId]);
        }, 50);
        // fetchNui("select", [props.type, props.targetId, props.zoneId]);
        setTimeout(() => {
          setPointerEvents(true);
        }, 200);
      }}
    >
      <FontAwesomeIcon 
        icon={props.icon as IconProp} 
        size='1x' 
        color={hovered ? colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.9) : 'white'}
        style={{
          transition: 'all ease-in-out 0.2s',
          aspectRatio: 1,
        }}
      />
      <Text
        size='sm'
        c={hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)'}
        style={{
          transition: 'all ease-in-out 0.2s',
        }}
      >{props.label}</Text>
    </Flex>
  )
}
