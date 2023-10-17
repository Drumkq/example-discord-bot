import { useState } from 'react';
import { Input } from '../../../Input/Input.component';
import { SelectInput } from '../../../Input/SelectInput.component';

export function WelcomeEditor() {
  const [message, setMessage] = useState('');
  const [channelId, setChannelId] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Welcome message"
        value={message}
        onValueChange={(e) => setMessage(e.target.value)}
        placeholder="Welcome to the {Guild}!"
      />
      <SelectInput
        label="Channel ID"
        values={['das', 'daa']}
        onValueChange={(e) => setChannelId(e.target.value)}
      ></SelectInput>
    </div>
  );
}
