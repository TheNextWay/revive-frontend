import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Colors from '@constants/Colors';

interface FormErrorMessageProps {
  error?: string;
  visible?: boolean;
}

export const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ error, visible }) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    marginLeft: 5,
    color: Colors.red,
    marginVertical: 2,
    
    fontSize: 12,
    fontWeight: '400',
    paddingLeft: 4,
  },
});
