import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight, CheckCircle2, Building2, Store, Calendar, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import MatchScoreBadge from '../cards/MatchScoreBadge';

export default function AIAssistantModal({ isOpen, onClose }) {
  const { products, exhibitors, exhibitions, stalls, executeAIMatching } = useData();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am **ExhiMatch AI**, your intelligent B2B sourcing concierge.\n\nTell me what equipment or supplier you are looking for, your budget, and preferred location (e.g., *'I need a packaging machine under ₹15 lakh near Mumbai'* or *'CNC Laser Cutting Machine in Maharashtra'*)."
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const sampleQueries = [
    "CNC Laser Cutting Machine ₹20-30 Lakhs in Mumbai",
    "Packaging machine under ₹15 lakh near Mumbai",
    "Robotic automation arm for automotive stamping",
    "Industrial hydraulic press 200 Ton"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    // Natural Language Parser
    let parsedProduct = query;
    let parsedCategory = "Industrial Machinery";
    let parsedLocation = "Mumbai";
    let parsedBudgetMin = 1500000;
    let parsedBudgetMax = 3000000;
    let parsedDistance = 200;

    const lower = query.toLowerCase();

    // Parse product category & terms
    if (lower.includes("packaging") || lower.includes("pouch") || lower.includes("bottling")) {
      parsedProduct = "Automatic Packaging & Pouch Sealing Machine";
      parsedCategory = "Packaging";
      parsedBudgetMin = 1000000;
      parsedBudgetMax = 1600000;
    } else if (lower.includes("cnc") || lower.includes("laser") || lower.includes("cutting")) {
      parsedProduct = "CNC Laser Cutting Machine";
      parsedCategory = "Industrial Machinery";
      parsedBudgetMin = 2000000;
      parsedBudgetMax = 3000000;
    } else if (lower.includes("robot") || lower.includes("automation") || lower.includes("arm")) {
      parsedProduct = "Robotic CNC Laser Cutting & Welding Cell";
      parsedCategory = "Industrial Automation";
      parsedBudgetMin = 2200000;
      parsedBudgetMax = 3200000;
    } else if (lower.includes("hydraulic") || lower.includes("press") || lower.includes("brake")) {
      parsedProduct = "CNC Hydraulic Press Brake (160 Ton)";
      parsedCategory = "Manufacturing";
      parsedBudgetMin = 1800000;
      parsedBudgetMax = 2600000;
    }

    // Parse location
    if (lower.includes("pune")) parsedLocation = "Pune";
    else if (lower.includes("delhi")) parsedLocation = "New Delhi";
    else if (lower.includes("bengaluru") || lower.includes("bangalore")) parsedLocation = "Bengaluru";
    else if (lower.includes("gujarat") || lower.includes("ahmedabad")) parsedLocation = "Gandhinagar";
    else parsedLocation = "Mumbai";

    // Run AI matching engine
    const results = await executeAIMatching({
      product_name: parsedProduct,
      category: parsedCategory,
      budget_min: parsedBudgetMin,
      budget_max: parsedBudgetMax,
      location: parsedLocation,
      max_distance: parsedDistance,
      preferred_date: "2026-11-13",
      additional_notes: query
    });

    setIsThinking(false);

    const topStall = results.topStalls[0];
    const topExh = results.recommendedExhibitions[0];

    const assistantReply = {
      role: 'assistant',
      text: `I've cross-referenced our industrial directory, exhibition schedules, and floor maps across **${exhibitions.length} major trade fairs** and **${stalls.length}+ verified stalls**. Here are your top recommendations:`,
      recommendationData: {
        query: parsedProduct,
        topExhibition: topExh,
        topStall: topStall,
        allStalls: results.topStalls.slice(0, 3),
        totalMatches: results.totalMatchesFound
      }
    };

    setMessages(prev => [...prev, assistantReply]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 md:p-5 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base flex items-center gap-2">
                ExhiMatch AI Assistant
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-300/30 text-purple-100">
                  OpsGenie Engine
                </span>
              </h3>
              <p className="text-xs text-indigo-100">
                Natural Language B2B Sourcing & Stall Level Discovery
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 bg-slate-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-sm' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-sm space-y-3'
              }`}>
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Structured Recommendation Card */}
                {msg.recommendationData && (
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
                    {/* Top Exhibition */}
                    {msg.recommendationData.topExhibition && (
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
                          <div>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Recommended Exhibition</span>
                            <h4 className="font-bold text-slate-900 text-xs">
                              {msg.recommendationData.topExhibition.name}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {msg.recommendationData.topExhibition.city} • {msg.recommendationData.topExhibition.start_date}
                            </p>
                          </div>
                        </div>
                        <MatchScoreBadge score={msg.recommendationData.topExhibition.matchPercentage || 92} size="sm" />
                      </div>
                    )}

                    {/* Top Stalls */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Top Stall Recommendations ({msg.recommendationData.allStalls.length}):
                      </span>

                      {msg.recommendationData.allStalls.map((match, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-xl border border-purple-200/80 shadow-xs hover:border-purple-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-slate-900 text-xs">
                                  {match.exhibitor.company_name}
                                </span>
                                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 font-black text-[10px]">
                                  Stall {match.stall.stall_number}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 mt-0.5">
                                {match.product.name}
                              </p>
                            </div>
                            <MatchScoreBadge score={match.matchPercentage} size="sm" />
                          </div>

                          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Stall Confirmed & Ready
                            </span>

                            <button
                              onClick={() => {
                                onClose();
                                navigate('/buyer/results');
                              }}
                              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              View Full Stalls & Map
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3 items-center text-xs text-slate-500 italic py-2 animate-pulse">
              <Bot className="w-5 h-5 text-purple-600" />
              <span>ExhiMatch AI is analyzing requirement against floor maps & machinery catalogs...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="p-3 bg-slate-100/70 border-t border-slate-200 overflow-x-auto flex gap-2">
          {sampleQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-white hover:bg-slate-50 text-slate-700 font-medium px-3 py-1.5 rounded-full border border-slate-200 shrink-0 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-purple-600" />
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="p-3.5 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. I need a CNC laser cutter under ₹30 lakh near Mumbai..."
              className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 border border-transparent focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Analyze</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
