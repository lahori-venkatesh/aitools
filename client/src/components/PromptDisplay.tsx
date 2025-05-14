import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CopyButton } from './ui/copy-button';

interface PromptDisplayProps {
  title: string;
  promptText: string;
}

const PromptDisplay = ({ title, promptText }: PromptDisplayProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <CopyButton text={promptText} />
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 whitespace-pre-wrap">{promptText}</p>
      </CardContent>
    </Card>
  );
};

export default PromptDisplay;