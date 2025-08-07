import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { 
  User, 
  LogOut, 
  Calendar, 
  Music, 
  Menu as MenuIcon,
  Plus,
  Trash2,
  Edit3,
  Eye
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, FormField, DateTimeField, Button, ConfirmModal, ListSkeleton } from './ui';
import '../styles/Admin.css';

interface Match {
  id: string;
  sport: string;
  league: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
}

interface Band {
  id: string;
  name: string;
  genre: string;
  date: string;
  time: string;
}

interface MenuPDF {
  id: string;
  name: string;
  type: 'food' | 'drinks' | 'seasonal';
  pdfUrl: string;
  fileName: string;
  isActive: boolean;
  uploadDate: string;
}

// Constants for form options
const SPORTS = [
  { value: "Football", label: "Football" },
  { value: "Rugby", label: "Rugby" },
  { value: "Hockey", label: "Hockey" },
  { value: "Basketball", label: "Basketball" },
  { value: "Tennis", label: "Tennis" },
  { value: "Boxing", label: "Boxing" },
  { value: "GAA", label: "GAA" }
];

const LEAGUES = {
  "Football": [
    { value: "Premier League", label: "Premier League" },
    { value: "Champions League", label: "Champions League" },
    { value: "Europa League", label: "Europa League" },
    { value: "La Liga", label: "La Liga" },
    { value: "Bundesliga", label: "Bundesliga" },
    { value: "Serie A", label: "Serie A" },
    { value: "Ligue 1", label: "Ligue 1" },
    { value: "Premier Division", label: "Premier Division (Ireland)" }
  ],
  "Rugby": [
    { value: "Six Nations", label: "Six Nations Championship" },
    { value: "Champions Cup", label: "Champions Cup" },
    { value: "Challenge Cup", label: "Challenge Cup" },
    { value: "URC", label: "United Rugby Championship" },
    { value: "All-Ireland League", label: "All-Ireland League" }
  ],
  "Hockey": [
    { value: "NHL", label: "NHL" },
    { value: "IIHF World Championship", label: "IIHF World Championship" },
    { value: "EHL", label: "Elite Ice Hockey League" }
  ],
  "Basketball": [
    { value: "NBA", label: "NBA" },
    { value: "EuroLeague", label: "EuroLeague" },
    { value: "Basketball Ireland", label: "Basketball Ireland" }
  ],
  "Tennis": [
    { value: "ATP Tour", label: "ATP Tour" },
    { value: "WTA Tour", label: "WTA Tour" },
    { value: "Grand Slam", label: "Grand Slam" }
  ],
  "Boxing": [
    { value: "Professional Boxing", label: "Professional Boxing" },
    { value: "Amateur Boxing", label: "Amateur Boxing" }
  ],
  "GAA": [
    { value: "GAA Football", label: "GAA Football" },
    { value: "GAA Hurling", label: "GAA Hurling" },
    { value: "GAA Camogie", label: "GAA Camogie" }
  ]
};

const GENRES = [
  { value: "Rock", label: "Rock" },
  { value: "Pop", label: "Pop" },
  { value: "Jazz", label: "Jazz" },
  { value: "Blues", label: "Blues" },
  { value: "Folk", label: "Folk" },
  { value: "Traditional Irish", label: "Traditional Irish" },
  { value: "Country", label: "Country" },
  { value: "Electronic", label: "Electronic" },
  { value: "Acoustic", label: "Acoustic" },
  { value: "Indie", label: "Indie" }
];

const MENU_TYPES = [
  { value: "food", label: "Food Menu" },
  { value: "drinks", label: "Drinks Menu" },
  { value: "seasonal", label: "Seasonal Menu" }
];


const Admin = () => {
  // Authentication state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Navigation state
  const [adminMode, setAdminMode] = useState<'matches' | 'bands' | 'menus'>('matches');
  
  // Data state
  const [matches, setMatches] = useState<Match[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [menus, setMenus] = useState<MenuPDF[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [newMatch, setNewMatch] = useState({
    sport: '',
    league: '',
    team1: '',
    team2: '',
    date: '',
    time: ''
  });
  const [newBand, setNewBand] = useState({
    name: '',
    genre: '',
    date: '',
    time: ''
  });

  // Edit and delete states
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [editingBand, setEditingBand] = useState<Band | null>(null);
  
  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsLoading(true);
        try {
          await Promise.all([
            fetchMatches(),
            fetchBands(),
            fetchMenus()
          ]);
          toast.success('Welcome to Admin Panel!');
        } catch (error) {
          toast.error('Error loading data');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const fetchBands = async () => {
    const bandsCollection = collection(db, 'bands');
    const bandsSnapshot = await getDocs(bandsCollection);
    const bandsList = bandsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        genre: data.genre || '',
        date: data.date || '',
        time: data.time || ''
      };
    }) as Band[];
    setBands(bandsList.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      return dateA.getTime() - dateB.getTime();
    }));
  };

  const fetchMenus = async () => {
    try {
      const menusCollection = collection(db, 'menus');
      const menusSnapshot = await getDocs(menusCollection);
      const menusList = menusSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuPDF[];
      setMenus(menusList.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()));
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const handleAddBand = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!newBand.name || !newBand.genre || !newBand.date || !newBand.time) {
        alert('Please fill in all fields');
        return;
      }
      const loadingToast = toast.loading('Adding band...');
      await addDoc(collection(db, 'bands'), newBand);
      setNewBand({ name: '', genre: '', date: '', time: '' });
      await fetchBands();
      toast.success('Band added successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error adding band:', error);
      toast.error('Error adding band');
    }
  };

  // Band management functions
  const handleEditBand = (band: Band) => {
    setEditingBand(band);
    setNewBand({
      name: band.name,
      genre: band.genre,
      date: band.date,
      time: band.time
    });
  };

  const handleUpdateBand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBand) return;
    
    try {
      if (!newBand.name || !newBand.genre || !newBand.date || !newBand.time) {
        toast.error('Please fill in all fields');
        return;
      }
      
      const loadingToast = toast.loading('Updating band...');
      await updateDoc(doc(db, 'bands', editingBand.id), newBand);
      setNewBand({ name: '', genre: '', date: '', time: '' });
      setEditingBand(null);
      await fetchBands();
      toast.success('Band updated successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error updating band:', error);
      toast.error('Error updating band');
    }
  };

  const handleDeleteBand = async (bandId: string, bandName: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Band',
      message: `Are you sure you want to delete "${bandName}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          const loadingToast = toast.loading('Deleting band...');
          await deleteDoc(doc(db, 'bands', bandId));
          await fetchBands();
          toast.success('Band deleted successfully!', { id: loadingToast });
        } catch (error) {
          console.error('Error deleting band:', error);
          toast.error('Error deleting band');
        }
      }
    });
  };

  const cancelEditBand = () => {
    setEditingBand(null);
    setNewBand({ name: '', genre: '', date: '', time: '' });
  };



  const fetchMatches = async () => {
    const matchesCollection = collection(db, 'matches');
    const matchesSnapshot = await getDocs(matchesCollection);
    const matchesList = matchesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        sport: data.sport || 'Football', // Default to Football if sport is missing
        league: data.league || '',
        team1: data.team1 || '',
        team2: data.team2 || '',
        date: data.date || '',
        time: data.time || ''
      };
    }) as Match[];
    setMatches(matchesList.sort((a, b) => {
      const dateA = new Date(a.date + 'T' + a.time);
      const dateB = new Date(b.date + 'T' + b.time);
      return dateA.getTime() - dateB.getTime();
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to logout.');
    }
  };

  const handleAddMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!newMatch.sport || !newMatch.league || !newMatch.team1 || !newMatch.team2 || !newMatch.date || !newMatch.time) {
        toast.error('Please fill in all fields');
        return;
      }
      const loadingToast = toast.loading('Adding match...');
      await addDoc(collection(db, 'matches'), newMatch);
      setNewMatch({ sport: '', league: '', team1: '', team2: '', date: '', time: '' });
      await fetchMatches();
      toast.success('Match added successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error adding match:', error);
      toast.error('Error adding match');
    }
  };

  // Match management functions
  const handleEditMatch = (match: Match) => {
    setEditingMatch(match);
    setNewMatch({
      sport: match.sport,
      league: match.league,
      team1: match.team1,
      team2: match.team2,
      date: match.date,
      time: match.time
    });
  };

  const handleUpdateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch) return;
    
    try {
      if (!newMatch.sport || !newMatch.league || !newMatch.team1 || !newMatch.team2 || !newMatch.date || !newMatch.time) {
        toast.error('Please fill in all fields');
        return;
      }
      
      const loadingToast = toast.loading('Updating match...');
      await updateDoc(doc(db, 'matches', editingMatch.id), newMatch);
      setNewMatch({ sport: '', league: '', team1: '', team2: '', date: '', time: '' });
      setEditingMatch(null);
      await fetchMatches();
      toast.success('Match updated successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error updating match:', error);
      toast.error('Error updating match');
    }
  };

  const handleDeleteMatch = async (matchId: string, matchTitle: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Match',
      message: `Are you sure you want to delete "${matchTitle}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          const loadingToast = toast.loading('Deleting match...');
          await deleteDoc(doc(db, 'matches', matchId));
          await fetchMatches();
          toast.success('Match deleted successfully!', { id: loadingToast });
        } catch (error) {
          console.error('Error deleting match:', error);
          toast.error('Error deleting match');
        }
      }
    });
  };

  const cancelEditMatch = () => {
    setEditingMatch(null);
    setNewMatch({ sport: '', league: '', team1: '', team2: '', date: '', time: '' });
  };




  if (!isLoggedIn) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="admin-login-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="admin-login-wrapper"
          >
            <Card className="admin-login-card" padding="xl">
              <div className="admin-login-header">
                <div className="admin-login-icon">
                  <User size={32} />
                </div>
                <h2 className="admin-login-title">Admin Login</h2>
                <p className="admin-login-subtitle">Access your Irish Pub management panel</p>
              </div>
              
              <form onSubmit={handleLogin} className="admin-login-form">
                <FormField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="admin@irishpub.com"
                  required
                  icon={<User size={18} />}
                />
                
                <FormField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="Your secure password"
                  required
                  icon={<LogOut size={18} />}
                />
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoggingIn}
                  className="admin-login-button"
                >
                  Sign In
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      <div className="admin-panel-container">
        {/* Header */}
        <motion.div 
          className="admin-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="admin-header-content">
            <div className="admin-header-left">
              <h1 className="admin-header-title">THE AULD ADMIN</h1>
              <p className="admin-header-subtitle">Management Panel</p>
            </div>
            <div className="admin-header-right">
              <div className="admin-user-info">
                <User size={20} />
                <span>Administrator</span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                icon={<LogOut size={16} />}
              >
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="admin-navigation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="admin-nav-tabs">
            <button
              onClick={() => setAdminMode('matches')}
              className={`admin-nav-tab ${adminMode === 'matches' ? 'active' : ''}`}
            >
              <Calendar size={20} />
              <span>Matches</span>
            </button>
            <button
              onClick={() => setAdminMode('bands')}
              className={`admin-nav-tab ${adminMode === 'bands' ? 'active' : ''}`}
            >
              <Music size={20} />
              <span>Live Music</span>
            </button>
            <button
              onClick={() => setAdminMode('menus')}
              className={`admin-nav-tab ${adminMode === 'menus' ? 'active' : ''}`}
            >
              <MenuIcon size={20} />
              <span>Menu Management</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="admin-main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLoading ? (
            <div className="admin-loading">
              <ListSkeleton items={5} />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={adminMode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </>
  );

  function renderContent() {
    switch (adminMode) {
      case 'matches':
        return renderMatchesSection();
      case 'bands':
        return renderBandsSection();
      case 'menus':
        return renderMenusSection();
      default:
        return null;
    }
  }

  function renderMatchesSection() {
    const today = new Date().toISOString().split('T')[0];
    
    return (
      <div className="admin-section">
        <div className="admin-section-header">
          <div>
            <h2 className="admin-section-title">Sports Matches</h2>
            <p className="admin-section-subtitle">Manage upcoming sports events</p>
          </div>
          <Button
            onClick={() => {/* TODO: Open add form */}}
            variant="primary"
            icon={<Plus size={16} />}
          >
            Add Match
          </Button>
        </div>
        
        <Card className="admin-add-form" padding="lg">
          <form onSubmit={editingMatch ? handleUpdateMatch : handleAddMatch}>
            <div className="form-grid">
              <FormField
                label="Sport Type"
                type="select"
                value={newMatch.sport}
                onChange={(value) => setNewMatch({ ...newMatch, sport: value, league: '' })}
                options={SPORTS}
                placeholder="Choose a sport"
                required
              />
              <FormField
                label="League / Competition"
                type="select"
                value={newMatch.league}
                onChange={(value) => setNewMatch({ ...newMatch, league: value })}
                options={newMatch.sport ? LEAGUES[newMatch.sport as keyof typeof LEAGUES] : []}
                placeholder={newMatch.sport ? "Choose a league" : "Select sport first"}
                disabled={!newMatch.sport}
                required
              />
              <FormField
                label="Home Team"
                value={newMatch.team1}
                onChange={(value) => setNewMatch({ ...newMatch, team1: value })}
                placeholder="Enter home team name"
                autoComplete="off"
                required
              />
              <FormField
                label="Away Team"
                value={newMatch.team2}
                onChange={(value) => setNewMatch({ ...newMatch, team2: value })}
                placeholder="Enter away team name"
                autoComplete="off"
                required
              />
              <DateTimeField
                label="Match Date"
                type="date"
                value={newMatch.date}
                onChange={(value) => setNewMatch({ ...newMatch, date: value })}
                min={today}
                required
              />
              <DateTimeField
                label="Kick-off Time"
                type="time"
                value={newMatch.time}
                onChange={(value) => setNewMatch({ ...newMatch, time: value })}
                required
              />
            </div>
            <div className="form-actions">
              {editingMatch ? (
                <>
                  <Button type="submit" variant="primary" size="lg">
                    Update Match
                  </Button>
                  <Button type="button" variant="secondary" size="lg" onClick={cancelEditMatch}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="submit" variant="primary" size="lg">
                  Add Match
                </Button>
              )}
            </div>
          </form>
        </Card>

        <div className="admin-items-grid">
          {matches.length === 0 ? (
            <Card className="admin-empty-state" padding="xl">
              <p>No matches scheduled yet. Add your first match!</p>
            </Card>
          ) : (
            matches.map((match) => (
              <Card key={match.id} hoverable className="admin-item-card">
                <div className="admin-item-header">
                  <h3 className="admin-item-title">{match.team1} vs {match.team2}</h3>
                  <div className="admin-item-actions">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Edit3 size={14} />}
                      onClick={() => handleEditMatch(match)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Trash2 size={14} />}
                      onClick={() => handleDeleteMatch(match.id, `${match.team1} vs ${match.team2}`)}
                    />
                  </div>
                </div>
                <div className="admin-item-content">
                  <p className="admin-item-meta">{match.sport} • {match.league}</p>
                  <p className="admin-item-date">
                    {new Date(match.date).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })} at {match.time}
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  function renderBandsSection() {
    const today = new Date().toISOString().split('T')[0];
    
    return (
      <div className="admin-section">
        <div className="admin-section-header">
          <div>
            <h2 className="admin-section-title">Live Music</h2>
            <p className="admin-section-subtitle">Manage upcoming musical events</p>
          </div>
          <Button
            onClick={() => {/* TODO: Open add form */}}
            variant="primary"
            icon={<Plus size={16} />}
          >
            Add Band
          </Button>
        </div>
        
        <Card className="admin-add-form" padding="lg">
          <form onSubmit={editingBand ? handleUpdateBand : handleAddBand}>
            <div className="form-grid">
              <FormField
                label="Artist / Band Name"
                value={newBand.name}
                onChange={(value) => setNewBand({ ...newBand, name: value })}
                placeholder="Enter artist or band name"
                autoComplete="off"
                required
              />
              <FormField
                label="Music Genre"
                type="select"
                value={newBand.genre}
                onChange={(value) => setNewBand({ ...newBand, genre: value })}
                options={GENRES}
                placeholder="Select music genre"
                required
              />
              <DateTimeField
                label="Performance Date"
                type="date"
                value={newBand.date}
                onChange={(value) => setNewBand({ ...newBand, date: value })}
                min={today}
                required
              />
              <DateTimeField
                label="Start Time"
                type="time"
                value={newBand.time}
                onChange={(value) => setNewBand({ ...newBand, time: value })}
                required
              />
            </div>
            <div className="form-actions">
              {editingBand ? (
                <>
                  <Button type="submit" variant="primary" size="lg">
                    Update Band
                  </Button>
                  <Button type="button" variant="secondary" size="lg" onClick={cancelEditBand}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="submit" variant="primary" size="lg">
                  Add Band
                </Button>
              )}
            </div>
          </form>
        </Card>

        <div className="admin-items-grid">
          {bands.length === 0 ? (
            <Card className="admin-empty-state" padding="xl">
              <p>No performances scheduled yet. Add your first band!</p>
            </Card>
          ) : (
            bands.map((band) => (
              <Card key={band.id} hoverable className="admin-item-card">
                <div className="admin-item-header">
                  <h3 className="admin-item-title">{band.name}</h3>
                  <div className="admin-item-actions">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Edit3 size={14} />}
                      onClick={() => handleEditBand(band)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Trash2 size={14} />}
                      onClick={() => handleDeleteBand(band.id, band.name)}
                    />
                  </div>
                </div>
                <div className="admin-item-content">
                  <p className="admin-item-meta">{band.genre}</p>
                  <p className="admin-item-date">
                    {new Date(band.date).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })} at {band.time}
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  function renderMenusSection() {
    return (
      <div className="admin-section">
        <div className="admin-section-header">
          <div>
            <h2 className="admin-section-title">Menu Management</h2>
            <p className="admin-section-subtitle">Upload and manage PDF menus</p>
          </div>
          <Button
            onClick={() => toast('Menu upload will be available after Supabase migration')}
            variant="primary"
            icon={<Plus size={16} />}
          >
            Upload Menu
          </Button>
        </div>
        
        <Card className="admin-add-form" padding="lg">
          <form>
            <div className="form-grid">
              <FormField
                label="Menu Name"
                value=""
                onChange={() => {}}
                placeholder="e.g., Weekend Brunch Menu"
                disabled
              />
              <FormField
                label="Menu Type"
                type="select"
                value=""
                onChange={() => {}}
                options={MENU_TYPES}
                placeholder="Select menu type"
                disabled
              />
            </div>
            <div className="upload-placeholder">
              <MenuIcon size={48} />
              <h3>Menu Upload Coming Soon</h3>
              <p>Menu upload functionality will be implemented with Supabase integration. You'll be able to upload PDF menus, set active status, and manage all your restaurant menus from here.</p>
            </div>
          </form>
        </Card>

        <div className="admin-items-grid">
          {menus.length === 0 ? (
            <Card className="admin-empty-state" padding="xl">
              <p>No menus uploaded yet. Upload your first menu!</p>
            </Card>
          ) : (
            menus.map((menu) => (
              <Card key={menu.id} hoverable className="admin-item-card">
                <div className="admin-item-header">
                  <h3 className="admin-item-title">{menu.name}</h3>
                  <div className="admin-item-actions">
                    <Button variant="ghost" size="sm" icon={<Eye size={14} />} />
                    <Button variant="ghost" size="sm" icon={<Edit3 size={14} />} />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Trash2 size={14} />}
                      onClick={() => toast('Delete functionality will be available after Supabase migration')}
                    />
                  </div>
                </div>
                <div className="admin-item-content">
                  <p className="admin-item-meta">{menu.type}</p>
                  <p className="admin-item-date">
                    Uploaded: {new Date(menu.uploadDate).toLocaleDateString('en-GB', {
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </p>
                  <div className="admin-item-status">
                    <span className={`status-badge ${menu.isActive ? 'active' : 'inactive'}`}>
                      {menu.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

};

export default Admin;
