export type Styles = {
  countdownContainer: string;
  label: string;
  label__android: string;
  label__ios: string;
  svg: string;
  wrapper: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
