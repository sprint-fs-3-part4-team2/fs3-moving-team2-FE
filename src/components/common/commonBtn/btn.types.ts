import { ComponentPropsWithoutRef } from 'react';

type CommonBtnWidthType = 'full' | 'half' | 'dynamic';

type CommonBtnHeightType = 'primary' | 'secondary' | 'tertiary' | 'dynamic';

type CommonBtnBackgroundColorType = 'gray' | 'blue' | 'white' | 'dynamic';

type CommonBtnTextColorType = 'white' | 'blue' | 'black' | 'gray' | 'dynamic';

type CommonBtnBorderColorsType = 'blue' | 'gray' | 'none';

export interface CommonBtnProps extends ComponentPropsWithoutRef<'button'> {
  widthType: CommonBtnWidthType;
  heightType: CommonBtnHeightType;
  backgroundColorType?: CommonBtnBackgroundColorType;
  textColorType?: CommonBtnTextColorType;
  borderColorsType?: CommonBtnBorderColorsType;
}
