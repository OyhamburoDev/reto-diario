import React from "react";
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";

type Props = {
  name: "home" | "person" | "time" | "settings";
  size?: number;
};

export default function GradientIcon({ name, size = 24 }: Props) {
  const icons = {
    home: "M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z",
    person:
      "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    time: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 11h-4V7h2v4h2Z",
    settings:
      "M19.43 12.98c.04-.32.07-.66.07-1s-.03-.68-.07-1l2.11-1.65a.5.5 0 0 0 .11-.64l-2-3.46a.5.5 0 0 0-.6-.22l-2.49 1a7.007 7.007 0 0 0-1.5-.88l-.38-2.65a.5.5 0 0 0-.5-.42h-4a.5.5 0 0 0-.5.42l-.38 2.65c-.52.2-1 .46-1.5.88l-2.49-1a.5.5 0 0 0-.6.22l-2 3.46a.5.5 0 0 0 .11.64L4.57 11c-.04.32-.07.66-.07 1s.03.68.07 1l-2.11 1.65a.5.5 0 0 0-.11.64l2 3.46a.5.5 0 0 0 .6.22l2.49-1c.46.36.96.66 1.5.88l.38 2.65a.5.5 0 0 0 .5.42h4a.5.5 0 0 0 .5-.42l.38-2.65c.52-.2 1-.46 1.5-.88l2.49 1a.5.5 0 0 0 .6-.22l2-3.46a.5.5 0 0 0-.11-.64l-2.11-1.65zM12 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z",
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#00BFFF" />
          <Stop offset="50%" stopColor="#33CCFF" />
          <Stop offset="100%" stopColor="#AA88FF" />
        </LinearGradient>
      </Defs>
      <Path d={icons[name]} stroke="url(#grad)" strokeWidth={2} fill="none" />
    </Svg>
  );
}
