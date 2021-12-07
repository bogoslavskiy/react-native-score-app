import * as React from 'react';
import { StyleSheet, Text as NativeText, TextProps } from 'react-native';

export function EuclidText(props: TextProps) {
  const style = StyleSheet.flatten(props.style) || {};
  const textStyle = [style, { fontFamily: 'EuclidCircularA-Bold' }];
  
  return (
    <NativeText 
      {...props} 
      style={textStyle} 
      allowFontScaling={false}
    />
  );
}
