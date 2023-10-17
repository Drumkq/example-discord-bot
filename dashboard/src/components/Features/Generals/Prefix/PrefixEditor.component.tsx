import { useState } from 'react';
import { Input } from '../../../Input/Input.component';

export function PrefixEditor() {
  const [prefix, setPrefix] = useState('default prefix');

  return (
    <Input
      label="Prefix"
      value={prefix}
      onValueChange={(e) => setPrefix(e.target.value)}
      placeholder="Default prefix"
    />
  );
}
