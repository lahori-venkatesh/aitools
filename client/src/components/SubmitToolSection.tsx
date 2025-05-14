import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const SubmitToolSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary to-purple-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Have an AI Tool to Share?</h2>
          <p className="text-xl opacity-90 mb-8">
            Submit your AI tool to our directory and reach thousands of potential users
          </p>
          <Link href="/submit">
            <Button className="bg-white text-primary hover:bg-gray-100 py-3 px-6 rounded-lg">
              Submit Your Tool
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubmitToolSection;
