import Input from '@/components/@common/Input/Input';
import { useState } from 'react';

const SignUpPage = () => {
  const [text, setText] = useState<string>('');

  return (
    <div>
      <Input
        width="50px"
        placeholder="test placeHolder"
        value={text}
        onBlur={() => alert(text)}
        onChange={e => setText(e.target.value)}
      />
    </div>
  );
};

export default SignUpPage;
