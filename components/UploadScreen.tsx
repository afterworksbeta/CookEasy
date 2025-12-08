
import React, { useState, useRef } from 'react';
import { ChevronLeft, Image as ImageIcon, Upload, Loader2, Camera } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Ingredient } from '../types';

interface UploadScreenProps {
  onBack: () => void;
  onAnalysisComplete: (ingredients: Ingredient[], imagePreview: string) => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onBack, onAnalysisComplete }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value to allow re-selecting the same file if needed
    e.target.value = '';
  };

  const handleExtract = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Extract base64 data and mime type
      const match = imagePreview.match(/^data:(.*);base64,(.*)$/);
      const mimeType = match ? match[1] : 'image/jpeg';
      const base64Data = match ? match[2] : '';

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [
            { 
              inlineData: { 
                mimeType: mimeType, 
                data: base64Data 
              } 
            },
            { 
              text: `Analyze this recipe image. Extract all visible ingredients or ingredients inferred from the dish name. 
                     Return a JSON object with a key "ingredients" containing an array of objects with "name" and optional "quantity" fields.` 
            }
          ]
        },
        config: {
          responseMimeType: "application/json"
        }
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText);
      const ingredients: Ingredient[] = data.ingredients || [];
      
      onAnalysisComplete(ingredients, imagePreview);

    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-app-bg animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center px-4 py-4 pt-10 relative">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-black/5 transition-colors absolute left-4 z-10"
        >
          <ChevronLeft size={24} className="text-app-dark" />
        </button>
        <h1 className="w-full text-center text-xl font-semibold text-app-dark">
          Upload your recipe
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center">
        {/* Image Preview / Placeholder */}
        <div 
          className="w-full aspect-[4/5] bg-white rounded-3xl shadow-card flex items-center justify-center overflow-hidden mb-6 relative cursor-pointer group transition-all"
          onClick={() => {
              if (!isAnalyzing) {
                  // If clicking the placeholder directly, default to gallery if not previewing
                  if (!imagePreview) fileInputRef.current?.click();
              }
          }}
        >
          {imagePreview ? (
            <img 
              src={imagePreview} 
              alt="Recipe Preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-4 text-gray-300 group-hover:text-app-primary transition-colors">
              <div className="w-20 h-20 rounded-full bg-app-bg flex items-center justify-center">
                <ImageIcon size={40} strokeWidth={1.5} className="text-gray-400 group-hover:text-app-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-400">Preview will appear here</span>
            </div>
          )}
          
          {/* Overlay for Change Image (only if image exists) */}
          {imagePreview && !isAnalyzing && (
            <div 
                className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                    e.stopPropagation();
                    setImagePreview(null);
                }}
            >
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <Camera size={16} className="text-app-dark" />
                <span className="text-xs font-semibold text-app-dark">Change</span>
              </div>
            </div>
          )}
        </div>

        {/* Explanation Text */}
        <p className="text-center text-app-text text-sm mb-8 leading-relaxed max-w-xs">
          We will detect the ingredients from your recipe photo and build a shopping list for you.
        </p>

        {/* Hidden File Inputs */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
          disabled={isAnalyzing}
        />
        <input 
          type="file" 
          ref={cameraInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
          className="hidden"
          disabled={isAnalyzing}
        />

        {/* Actions */}
        <div className="w-full flex flex-col gap-3 mt-auto pb-8">
          {!imagePreview ? (
            <>
                <button
                onClick={() => cameraInputRef.current?.click()}
                className="w-full bg-app-lime text-white font-semibold py-4 rounded-[32px] shadow-lg shadow-app-lime/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:brightness-105"
                >
                <Camera size={20} />
                Take a Photo
                </button>
                <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-white text-app-dark font-semibold py-4 rounded-[32px] border border-gray-200 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-gray-50"
                >
                <ImageIcon size={20} />
                Upload from Gallery
                </button>
            </>
          ) : (
            <>
              {isAnalyzing ? (
                <div className="w-full bg-white border border-app-primary/30 text-app-primary font-semibold py-4 rounded-[32px] flex items-center justify-center gap-3">
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing your recipe image...
                </div>
              ) : (
                <button
                  onClick={handleExtract}
                  className="w-full bg-app-lime text-white font-semibold py-4 rounded-[32px] shadow-lg shadow-app-lime/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:brightness-105"
                >
                  <Upload size={20} />
                  Extract ingredients
                </button>
              )}
              
              {!isAnalyzing && (
                <button
                  onClick={() => setImagePreview(null)}
                  className="w-full bg-white text-app-text font-medium py-4 rounded-[32px] border border-transparent hover:border-app-divider transition-colors"
                >
                  Choose different image
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
