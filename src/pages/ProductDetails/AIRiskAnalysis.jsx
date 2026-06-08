import React, { useState } from 'react';
import axios from 'axios';

const AIRiskAnalysis = ({ productId }) => {
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!productId) {
            setError("Product ID is missing.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // credentials
            const response = await axios.post(
                'http://localhost:3000/api/ai-risk-analysis',
                { productId },
                { withCredentials: true }
            );
            if (response.data.success) {
                setAnalysis(response.data.analysis);
            }
        } catch (err) {
            console.error("Error fetching AI analysis:", err);
            setError(err.response?.data?.error || "Failed to generate AI Risk Report.");
        } finally {
            setLoading(false);
        }
    };

    const getBadgeColor = (level) => {
        if (level === 'High') return 'bg-red-100 text-red-800 border-red-200';
        if (level === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-200';
        return 'bg-green-100 text-green-800 border-green-200';
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl mt-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        ✨ AI Production Risk Analysis
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">Real-time dynamic inventory & timeline safety check</p>
                </div>
                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition disabled:opacity-50 shadow-sm"
                >
                    {loading ? (
                        <span className="flex items-center gap-1">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            Analyzing...
                        </span>
                    ) : 'Run AI Analysis'}
                </button>
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 mt-2">
                    ⚠️ {error}
                </div>
            )}

            {analysis && (
                <div className="mt-4 space-y-4 border-t border-gray-100 pt-4 animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Risk Status:</span>
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${getBadgeColor(analysis.riskLevel)}`}>
                            {analysis.riskLevel} Risk
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">📦 Material Risk</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{analysis.materialRisk}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">⏳ Timeline Risk</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{analysis.timelineRisk}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">💡 AI Recommendation</h4>
                        <p className="text-sm text-indigo-900 font-medium leading-relaxed">{analysis.recommendation}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIRiskAnalysis;