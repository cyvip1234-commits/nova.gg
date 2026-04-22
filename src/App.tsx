/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, Trophy, Ghost, Puzzle, Rocket, X, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import gamesData from './data/games.json';

interface Game {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  url: string;
}

const CATEGORIES = [
  { name: 'All', icon: <Gamepad2 className="w-4 h-4" /> },
  { name: 'Action', icon: <Rocket className="w-4 h-4" /> },
  { name: 'Arcade', icon: <Ghost className="w-4 h-4" /> },
  { name: 'Puzzle', icon: <Puzzle className="w-4 h-4" /> },
  { name: 'Sports', icon: <Trophy className="w-4 h-4" /> },
  { name: 'Funny', icon: <Ghost className="w-4 h-4" /> },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Filter logic with safety check
  const filteredGames = useMemo(() => {
    if (!Array.isArray(gamesData)) return [];
    return (gamesData as Game[]).filter((game) => {
      const matchesSearch = game.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredGame = useMemo(() => {
    return Array.isArray(gamesData) && gamesData.length > 0 ? (gamesData[0] as Game) : null;
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-gray-200 font-sans">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-6 md:px-8 bg-[#121214] border-b border-white/5 shadow-2xl">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setSelectedGame(null)}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-all">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">
            NOVA<span className="text-indigo-500">X</span>
          </span>
        </div>

        <div className="flex-1 max-w-md mx-6 md:mx-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search 100+ unblocked games..."
              className="w-full bg-[#1A1A1C] border border-white/5 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all outline-none text-white placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              const random = gamesData[Math.floor(Math.random() * gamesData.length)];
              setSelectedGame(random as Game);
            }}
            className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-xl font-black text-xs uppercase hover:bg-indigo-500 hover:text-white transition-all shadow-lg"
          >
            <Rocket className="w-3.5 h-3.5" />
            Shuffle
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px]">
            <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center">
               <Gamepad2 className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Sub-nav Categories */}
      <nav className="sticky top-16 z-30 h-12 border-b border-white/5 bg-[#0F0F11] flex items-center px-6 md:px-8 gap-6 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 h-full px-2 transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.name
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
        <div className="text-[11px] font-bold text-indigo-300 ml-auto hidden sm:block">HOT GAMES 🔥</div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {!selectedGame ? (
          <>
            {/* Featured Section */}
            {searchQuery === '' && selectedCategory === 'All' && featuredGame && (
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Trending Now</h3>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    {[1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/10"></div>)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[400px]">
                  {/* Hero Featured Card */}
                  <div 
                    onClick={() => setSelectedGame(featuredGame)}
                    className="md:col-span-8 bg-[#121214] rounded-2xl border border-white/5 p-8 flex flex-col justify-end relative overflow-hidden group shadow-2xl cursor-pointer"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-80"></div>
                    <img 
                      src={featuredGame.thumbnail} 
                      className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 group-hover:scale-110 transition-transform duration-700" 
                      alt="Featured"
                    />
                    <div className="z-20">
                      <span className="bg-indigo-600 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest text-white">Daily Featured</span>
                      <h2 className="text-4xl md:text-5xl font-black text-white mt-3 leading-tight tracking-tight uppercase italic">{featuredGame.title}</h2>
                      <p className="text-gray-300 text-sm mt-3 max-w-md hidden sm:block">Experience the most popular title in our unblocked library today. Fast, responsive, and full of action.</p>
                      <button className="mt-6 bg-white text-black font-black px-8 py-4 rounded-xl text-xs uppercase flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">
                        PLAY NOW <Rocket className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Side Cards */}
                  <div className="md:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6">
                    {(gamesData as Game[]).slice(1, 3).map((game) => (
                      <div 
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className="bg-[#121214] border border-white/5 rounded-2xl p-4 flex flex-col justify-end relative overflow-hidden group cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 opacity-60"></div>
                        <img 
                          src={game.thumbnail} 
                          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 group-hover:scale-110 transition-transform duration-500" 
                          alt={game.title}
                        />
                        <div className="z-20">
                           <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{game.category}</span>
                           <h4 className="text-lg font-bold text-white leading-tight mt-1">{game.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Grid */}
            <div className="mb-12">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 border-l-2 border-indigo-500 pl-4">
                {selectedCategory} Library <span className="text-gray-700 ml-2">/ {filteredGames.length} Available</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} onClick={() => setSelectedGame(game)} />
                  ))}
                </AnimatePresence>
              </div>
              
              {filteredGames.length === 0 && (
                <div className="text-center py-20 bg-[#121214] rounded-3xl border border-white/5">
                  <Ghost className="w-16 h-16 text-gray-800 mx-auto mb-4" />
                  <p className="text-xl font-bold text-gray-500">No results for your query</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Game Player View */
          <div className={`fixed inset-0 z-50 bg-[#0A0A0B] flex flex-col ${isFullscreen ? '' : 'p-4 md:p-8 animate-in fade-in zoom-in duration-300'}`}>
            <div className="flex items-center justify-between mb-4 text-white">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="bg-white/5 hover:bg-white/10 p-2.5 rounded-xl transition-all"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-white" />
                </button>
                <div>
                   <h2 className="text-xl font-black italic tracking-tight">{selectedGame.title}</h2>
                   <div className="flex items-center gap-3 mt-0.5">
                     <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{selectedGame.category}</span>
                     <span className="h-1 w-1 rounded-full bg-gray-700"></span>
                     <span className="text-[10px] font-medium text-gray-500">Online • 14.2k playing</span>
                   </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                   onClick={() => window.open(selectedGame.url, '_blank')}
                   className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[11px] font-black uppercase transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Source
                </button>
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className={`flex-1 relative bg-[#121214] border border-white/5 rounded-2xl overflow-hidden shadow-2xl ${isFullscreen ? 'rounded-none border-none' : ''}`}>
              <iframe
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>
        )}
      </main>

      {/* Stats Bar */}
      {!selectedGame && (
        <div className="px-6 md:px-8 pb-8">
          <div className="max-w-7xl mx-auto bg-[#121214] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Live Players</span>
                <span className="text-2xl font-mono font-bold text-green-400 tracking-tighter">14,208</span>
              </div>
              <div className="h-10 w-[1px] bg-white/5"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-gray-600 font-bold">Games Hub</span>
                <span className="text-2xl font-mono font-bold text-white tracking-tighter">100+</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {['JD', 'AS', 'MK', 'LR'].map((u, i) => (
                   <div key={i} className={`w-9 h-9 rounded-full border-2 border-[#121214] flex items-center justify-center text-[10px] font-black text-white ${i % 2 === 0 ? 'bg-indigo-600' : 'bg-purple-600'}`}>
                     {u}
                   </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-[#121214] bg-gray-800 flex items-center justify-center text-[10px] font-black text-gray-400">
                  +14k
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Grid Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-white/5 bg-[#0A0A0B] py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-lg text-white">N</div>
            <span className="text-lg font-bold text-white italic">NOVA<span className="text-indigo-500">X</span></span>
          </div>
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Curated Gaming • Experience without boundaries</p>
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GameCard({ game, onClick }: { game: Game; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-[#161618] border border-white/5 rounded-2xl flex flex-col p-3 cursor-pointer hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
    >
      <div className="aspect-square w-full rounded-xl overflow-hidden relative mb-3 bg-[#1A1A1E]">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="px-1">
        <span className="text-[9px] font-bold text-indigo-400/80 uppercase tracking-[0.2em]">{game.category}</span>
        <h4 className="text-[11px] font-bold text-white truncate mt-1 group-hover:text-indigo-300 transition-colors">{game.title}</h4>
      </div>
    </motion.div>
  );
}