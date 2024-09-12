import { Flex } from "@mantine/core";
import Option, { OptionProps } from "./Option";

export type OptionsProps = {
  options: OptionProps[];
}

export default function Options(props:OptionsProps){
  return (
    <Flex
      direction={'column'}
      gap='xs'
    > 
      {props.options.map((option, index) => (
        <Option key={index}
          label={option.label}
          icon={option.icon}
          hide={option.hide}
          type={option.type}
          targetId={option.targetId}
          zoneId={option.zoneId}
        />
      ))}
    </Flex>
  )
}