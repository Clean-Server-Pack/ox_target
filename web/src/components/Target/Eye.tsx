import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import colorWithAlpha from "../../utils/colorWithAlpha";

export type EyeProps = {
  targetActive: boolean;
}

export default function Eye(props:EyeProps){
  const theme = useMantineTheme();
  const [targetActive, setTargetActive] = useState(false);
  
  useEffect(() => {
    setTargetActive(props.targetActive);
  }, [props.targetActive]);
  return ( 
    <Flex
      h='fit-content'
      style={{
        outline: targetActive ? `2px solid ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : '2px solid rgba(77,77,77,0.5)',
        // borderRadius: theme.radius.xs,
        backgroundColor: 'rgba(0,0,0,0.5)',
        
        boxShadow: targetActive ? `inset 0 0 1.3vh ${colorWithAlpha(theme.colors[theme.primaryColor][theme.primaryShade as number], 0.8)}` : 'inset 0 0 20px rgba(0,0,0,0.6)',
        transition: 'all ease-in-out 0.1s',
        borderRadius: '50%',
      }}
    >
      <FontAwesomeIcon  
        icon={'fas fa-eye' as IconProp} 
        size='1x' 
        color={targetActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)'}
        style={{
          padding: '0.7vh',
          aspectRatio: 1,
          transition: 'all ease-in-out 0.1s',
          // transform: targetActive ? 'rotate(0deg)' : 'rotate(-45deg)',
        }}
      />
    </Flex>
  )
}