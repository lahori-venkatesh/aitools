import React from "react";
import { Guide } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";

interface HowToUseGuideProps {
  guide?: Guide;
  toolName: string;
}

const HowToUseGuide = ({ guide, toolName }: HowToUseGuideProps) => {
  if (!guide) {
    return (
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use {toolName} Effectively</h2>
        <p className="text-gray-500">No guide available for this tool yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{guide.title}</h2>
      
      <div className="space-y-4">
        {guide.steps.map((step, index) => (
          <Card key={index} className="bg-gray-50 rounded-lg border border-gray-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <span className="bg-primary-100 text-primary rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <p className="text-gray-700 text-sm mt-2">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowToUseGuide;
