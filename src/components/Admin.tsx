import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithSupabase, signOutSupabase, onAuthStateChange } from '../services/supabaseAuth';
import { databaseService } from '../services/database';
import { supabase } from '../config/supabase';
import { 
  User, 
  LogOut, 
  Calendar, 
  Music, 
  Menu as MenuIcon,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Upload,
  Download
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, FormField, DateTimeField, Button, ConfirmModal, ListSkeleton } from './ui';
import FileUpload from './FileUpload';
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
  type: 'food' | 'drinks';
  file_url: string;
  file_name: string;
  is_active: boolean;
  upload_date: string;
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

const ARTISTS = [
  "Tomas Pereda",
  "The Copy Cat",
  "Dale Watts",
  "Band of Five",
  "Nick Ennis",
  "Sean Maccabe",
  "Chris Lonergan"
];

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
  { value: "Indie", label: "Indie" },
  { value: "Troubadour", label: "Troubadour" },
  { value: "Pub Music", label: "Pub Music" },
  { value: "Celtic", label: "Celtic" },
  { value: "Singer-Songwriter", label: "Singer-Songwriter" }
];

const MENU_TYPES = [
  { value: "food", label: "Food Menu" },
  { value: "drinks", label: "Drinks Menu" }
];

// ArtistDropdown Component
interface ArtistDropdownProps {
  value: string;
  selectedArtists: string[];
  disabled: boolean;
  onValueChange: (value: string) => void;
  onAddArtist: (artist: string) => void;
  onRemoveArtist: (artist: string) => void;
}

const ArtistDropdown: React.FC<ArtistDropdownProps> = ({
  value,
  selectedArtists,
  disabled,
  onValueChange,
  onAddArtist,
  onRemoveArtist
}) => {
  const [showArtistList, setShowArtistList] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'right' | 'below'>('right');
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef.current || !showArtistList) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const dropdownWidth = 320;
      const dropdownHeight = 500; // max-height

      // Check if we're on mobile (width < 768px)
      const isMobile = viewportWidth < 768;

      if (isMobile) {
        setDropdownPosition('below');
      } else {
        // Desktop: Check if there's enough space to the right
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceBelow = viewportHeight - triggerRect.bottom;

        if (spaceRight >= dropdownWidth + 16) {
          // Enough space to the right
          setDropdownPosition('right');
        } else if (spaceBelow >= Math.min(dropdownHeight, 300)) {
          // Not enough space right, but enough space below
          setDropdownPosition('below');
        } else {
          // Default to right even if it might overflow (will be scrollable)
          setDropdownPosition('right');
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [showArtistList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showArtistList &&
        dropdownRef.current &&
        triggerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setShowArtistList(false);
      }
    };

    if (showArtistList) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showArtistList]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showArtistList) {
        setShowArtistList(false);
      }
    };

    if (showArtistList) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showArtistList]);

  return (
    <div ref={triggerRef} style={{ position: 'relative' }}>
      <FormField
        label="Artist / Band Name"
        value={value}
        onChange={onValueChange}
        placeholder="Enter artist or band name"
        autoComplete="off"
        disabled={disabled}
        statusIcon={
          <button
            type="button"
            className="inline-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setShowArtistList(!showArtistList);
            }}
            style={{ padding: '4px 8px', fontSize: '20px' }}
            disabled={disabled}
            aria-label={showArtistList ? 'Close artist list' : 'Open artist list'}
            aria-expanded={showArtistList}
          >
            {showArtistList ? '✕' : '☰'}
          </button>
        }
      />
      {showArtistList && (
        <>
          <div
            className="artist-list-backdrop"
            onClick={() => setShowArtistList(false)}
            aria-hidden="true"
          />
          <div
            ref={dropdownRef}
            className={`artist-list-dropdown artist-list-dropdown--${dropdownPosition}`}
            role="listbox"
            aria-label="Artist selection"
          >
            {ARTISTS.map((artist) => (
              <div
                key={artist}
                className={`artist-list-item ${selectedArtists.includes(artist) ? 'selected' : ''}`}
                role="option"
                aria-selected={selectedArtists.includes(artist)}
              >
                <span className="artist-name">{artist}</span>
                {selectedArtists.includes(artist) ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveArtist(artist);
                    }}
                    className="artist-action-btn remove"
                    aria-label={`Remove ${artist}`}
                  >
                    ✕
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddArtist(artist);
                    }}
                    className="artist-action-btn add"
                    aria-label={`Add ${artist}`}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


const Admin = () => {
  // Authentication state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Navigation state
  const [adminMode, setAdminMode] = useState<'matches' | 'bands' | 'menus'>('matches');
  
  // Data state
  const [matches, setMatches] = useState<Match[]>([]);
  const [bands, setBands] = useState<Band[]>([]);
  const [menus, setMenus] = useState<MenuPDF[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Menu upload state
  const [newMenu, setNewMenu] = useState({
    name: '',
    type: 'food' as 'food' | 'drinks',
    file: null as File | null
  });
  const [uploadingMenu, setUploadingMenu] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [_editingMenu, _setEditingMenu] = useState<MenuPDF | null>(null);
  
  // Form state
  const [newMatch, setNewMatch] = useState({
    sport: '',
    customSport: '',
    league: '',
    customLeague: '',
    team1: '',
    team2: '',
    date: '',
    time: ''
  });
  const [useCustomSport, setUseCustomSport] = useState(false);
  const [useCustomLeague, setUseCustomLeague] = useState(false);
  const [newBand, setNewBand] = useState({
    name: '',
    genre: '',
    date: '',
    time: '22:00'
  });
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [noMusic, setNoMusic] = useState(false);

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
    const { data: { subscription } } = onAuthStateChange(async (user) => {
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
          console.error('Error loading data:', error);
          toast.error('Error loading data');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle browser/tab close - force logout for security
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Force logout when browser/tab is closing
      signOutSupabase();
      // Clear any remaining session data
      sessionStorage.clear();
    };

    const handleUnload = () => {
      // Additional cleanup on page unload
      signOutSupabase();
      sessionStorage.clear();
    };

    const handleVisibilityChange = () => {
      // Optional: Also logout when tab becomes hidden for extended period
      if (document.hidden) {
        // Tab is now hidden - could add additional security logic here
        console.log('Admin tab hidden - session maintained until close');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchBands = async () => {
    try {
      const bandsList = await databaseService.getBands();
      setBands(bandsList.sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time);
        const dateB = new Date(b.date + 'T' + b.time);
        return dateA.getTime() - dateB.getTime();
      }));
    } catch (error) {
      console.error('Error fetching bands:', error);
      toast.error('Error fetching bands');
    }
  };

  const fetchMenus = async () => {
    try {
      const menusList = await databaseService.getMenus();
      setMenus(menusList.sort((a, b) => {
        const dateA = a.upload_date || '';
        const dateB = b.upload_date || '';
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }));
    } catch (error) {
      console.error('Error fetching menus:', error);
      toast.error('Error fetching menus');
    }
  };

  const handleAddBand = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (noMusic) {
        if (!newBand.date) {
          toast.error('Please select a date');
          return;
        }
        const loadingToast = toast.loading('Adding no music day...');
        await databaseService.addBand({
          name: 'No Music',
          genre: 'No Music',
          date: newBand.date,
          time: '00:00'
        });
        setNewBand({ name: '', genre: '', date: '', time: '22:00' });
        setSelectedArtists([]);
        setNoMusic(false);
        await fetchBands();
        toast.success('No music day added successfully!', { id: loadingToast });
        return;
      }

      if (!newBand.name || !newBand.genre || !newBand.date || !newBand.time) {
        toast.error('Please fill in all fields');
        return;
      }
      const loadingToast = toast.loading('Adding band...');
      await databaseService.addBand(newBand);
      // Keep the artist name, but clear other fields
      setNewBand({ ...newBand, genre: '', date: '', time: '22:00' });
      // Don't clear selectedArtists to keep the name intact
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
      await databaseService.updateBand(editingBand.id, newBand);
      setNewBand({ name: '', genre: '', date: '', time: '22:00' });
      setEditingBand(null);
      setSelectedArtists([]);
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
          await databaseService.deleteBand(bandId);
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
    setNewBand({ name: '', genre: '', date: '', time: '22:00' });
    setSelectedArtists([]);
    setNoMusic(false);
  };

  const handleAddArtistToList = (artist: string) => {
    if (!selectedArtists.includes(artist)) {
      const newList = [...selectedArtists, artist];
      setSelectedArtists(newList);
      setNewBand({ ...newBand, name: newList.join(', ') });
    }
  };

  const handleRemoveArtist = (artist: string) => {
    const newList = selectedArtists.filter(a => a !== artist);
    setSelectedArtists(newList);
    setNewBand({ ...newBand, name: newList.join(', ') });
  };



  const fetchMatches = async () => {
    try {
      const matchesList = await databaseService.getMatches();
      setMatches(matchesList.sort((a, b) => {
        const dateA = new Date(a.date + 'T' + a.time);
        const dateB = new Date(b.date + 'T' + b.time);
        return dateA.getTime() - dateB.getTime();
      }));
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast.error('Error fetching matches');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoggingIn(true);
    try {
      const { user, error } = await signInWithSupabase(email, password);
      if (error) {
        toast.error(error.message || 'Failed to login. Please check your credentials.');
      } else if (user) {
        toast.success('Login successful!');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await signOutSupabase();
      
      // Clear all session storage data for security
      sessionStorage.clear();
      
      // Reset component state
      setIsLoggedIn(false);
      setEmail('');
      setPassword('');
      setShowPassword(false);
      
      // Clear data arrays for security
      setMatches([]);
      setBands([]);
      setMenus([]);
      
      if (error) {
        toast.error(error.message || 'Failed to logout.');
      } else {
        toast.success('Logged out successfully');
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      // Still clear session data even if Supabase logout fails
      sessionStorage.clear();
      setIsLoggedIn(false);
      toast.error('Failed to logout.');
    }
  };

  const handleAddMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalSport = useCustomSport ? newMatch.customSport : newMatch.sport;
      const finalLeague = useCustomLeague ? newMatch.customLeague : newMatch.league;
      if (!finalSport || !finalLeague || !newMatch.team1 || !newMatch.team2 || !newMatch.date || !newMatch.time) {
        toast.error('Please fill in all fields');
        return;
      }
      const loadingToast = toast.loading('Adding match...');
      const matchData = {
        sport: finalSport,
        league: finalLeague,
        team1: newMatch.team1,
        team2: newMatch.team2,
        date: newMatch.date,
        time: newMatch.time
      };
      await databaseService.addMatch(matchData);
      setNewMatch({ sport: '', customSport: '', league: '', customLeague: '', team1: '', team2: '', date: '', time: '' });
      setUseCustomSport(false);
      setUseCustomLeague(false);
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
    
    // Check if the sport exists in our predefined options
    const isCustomSport = !SPORTS.some(sport => sport.value === match.sport);
    
    // Check if the league exists in our predefined options
    const predefinedLeagues = LEAGUES[match.sport as keyof typeof LEAGUES] || [];
    const isCustomLeague = !predefinedLeagues.some(league => league.value === match.league);
    
    setUseCustomSport(isCustomSport);
    setUseCustomLeague(isCustomLeague);
    setNewMatch({
      sport: isCustomSport ? '' : match.sport,
      customSport: isCustomSport ? match.sport : '',
      league: isCustomLeague ? '' : match.league,
      customLeague: isCustomLeague ? match.league : '',
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
      const finalSport = useCustomSport ? newMatch.customSport : newMatch.sport;
      const finalLeague = useCustomLeague ? newMatch.customLeague : newMatch.league;
      if (!finalSport || !finalLeague || !newMatch.team1 || !newMatch.team2 || !newMatch.date || !newMatch.time) {
        toast.error('Please fill in all fields');
        return;
      }
      
      const loadingToast = toast.loading('Updating match...');
      const matchData = {
        sport: finalSport,
        league: finalLeague,
        team1: newMatch.team1,
        team2: newMatch.team2,
        date: newMatch.date,
        time: newMatch.time
      };
      await databaseService.updateMatch(editingMatch.id, matchData);
      setNewMatch({ sport: '', customSport: '', league: '', customLeague: '', team1: '', team2: '', date: '', time: '' });
      setUseCustomSport(false);
      setUseCustomLeague(false);
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
          await databaseService.deleteMatch(matchId);
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
    setNewMatch({ sport: '', customSport: '', league: '', customLeague: '', team1: '', team2: '', date: '', time: '' });
    setUseCustomSport(false);
    setUseCustomLeague(false);
  };

  // Menu management functions
  const handleFileSelect = (file: File) => {
    setNewMenu({ ...newMenu, file });
  };

  const handleFileRemove = () => {
    setNewMenu({ ...newMenu, file: null });
  };

  const uploadFileToSupabase = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    // Убираем дублирование "menus/" в пути
    const filePath = fileName;
    
    setUploadProgress(0);
    
    // For now, we'll use a simple upload without progress tracking
    // In a real implementation, you might want to use a chunked upload with progress
    const { data: _uploadData, error } = await supabase.storage
      .from('menus')
      .upload(filePath, file);
    
    if (error) {
      throw error;
    }
    
    // Get public URL - попробуем альтернативный способ
    const { data: urlData } = supabase.storage
      .from('menus')
      .getPublicUrl(filePath); // Используем filePath вместо data.path
    
    setUploadProgress(100);
    console.log('Upload successful. File path:', filePath);
    console.log('Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  };

  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMenu.name || !newMenu.type || !newMenu.file) {
      toast.error('Please fill in all fields and select a file');
      return;
    }
    
    setUploadingMenu(true);
    const loadingToast = toast.loading('Uploading menu...');
    
    try {
      // Upload file to Supabase Storage
      const fileUrl = await uploadFileToSupabase(newMenu.file);
      
      // Save menu record to database
      const menuData = {
        name: newMenu.name,
        type: newMenu.type,
        file_url: fileUrl,
        file_name: newMenu.file.name,
        is_active: true,
        upload_date: new Date().toISOString()
      };
      
      await (databaseService as any).addMenu(menuData);
      
      // Reset form
      setNewMenu({ name: '', type: 'food', file: null });
      setUploadProgress(0);
      
      // Refresh menus
      await fetchMenus();
      
      toast.success('Menu uploaded successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Error uploading menu:', error);
      toast.error('Error uploading menu', { id: loadingToast });
    } finally {
      setUploadingMenu(false);
    }
  };

  const handleToggleMenuActive = async (menuId: string, currentStatus: boolean) => {
    try {
      const loadingToast = toast.loading('Updating menu status...');
      
      await (databaseService as any).updateMenu(menuId, {
        is_active: !currentStatus
      });
      
      await fetchMenus();
      toast.success('Menu status updated!', { id: loadingToast });
    } catch (error) {
      console.error('Error updating menu status:', error);
      toast.error('Error updating menu status');
    }
  };

  const handleDeleteMenu = async (menuId: string, menuName: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Menu',
      message: `Are you sure you want to delete "${menuName}"? This action cannot be undone.`,
      onConfirm: async () => {
        try {
          const loadingToast = toast.loading('Deleting menu...');
          
          // Находим меню чтобы получить путь к файлу
          const menuToDelete = menus.find(menu => menu.id === menuId);
          
          if (menuToDelete) {
            // Извлекаем имя файла из URL
            const fileUrl = menuToDelete.file_url || '';
            const fileName = fileUrl.split('/').pop(); // Получаем последнюю часть URL
            
            if (fileName) {
              // Удаляем файл из Storage
              const { error: storageError } = await supabase.storage
                .from('menus')
                .remove([fileName]);
              
              if (storageError) {
                console.error('Error deleting file from storage:', storageError);
                // Продолжаем удаление из БД даже если файл не удалился
              }
            }
          }
          
          // Удаляем запись из базы данных
          await (databaseService as any).deleteMenu(menuId);
          await fetchMenus();
          toast.success('Menu deleted successfully!', { id: loadingToast });
        } catch (error) {
          console.error('Error deleting menu:', error);
          toast.error('Error deleting menu');
        }
      }
    });
  };

  const handleViewMenu = (menu: MenuPDF) => {
    const url = menu.file_url || '';
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error('Menu file not found');
    }
  };




  if (!isLoggedIn) {
    return (
      <>
        <Helmet>
          <title>Admin Login - The Auld Dub</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
          <meta name="bingbot" content="noindex, nofollow" />
        </Helmet>
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
                  icon={<User size={18} />}
                />
                
                <div className="password-field-container">
                  <FormField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={setPassword}
                    placeholder="Your secure password"
                    icon={<LogOut size={18} />}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
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
      <Helmet>
        <title>Admin Panel - The Auld Dub</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </Helmet>
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
                type={useCustomSport ? "text" : "select"}
                value={useCustomSport ? newMatch.customSport : newMatch.sport}
                onChange={(value) => {
                  if (useCustomSport) {
                    setNewMatch({ ...newMatch, customSport: value, league: '', customLeague: '' });
                  } else {
                    setNewMatch({ ...newMatch, sport: value, league: '', customLeague: '' });
                  }
                  setUseCustomLeague(false);
                }}
                options={useCustomSport ? undefined : SPORTS}
                placeholder={useCustomSport ? "Enter custom sport" : "Choose a sport"}
                autoComplete="off"
                statusIcon={
                  <button
                    type="button"
                    className={`inline-toggle ${useCustomSport ? 'active' : ''}`}
                    onClick={() => {
                      setUseCustomSport(!useCustomSport);
                      setNewMatch({ ...newMatch, sport: '', customSport: '', league: '', customLeague: '' });
                      setUseCustomLeague(false);
                    }}
                  >
                    Custom
                  </button>
                }
              />
              
              <FormField
                label="League / Competition"
                type={useCustomLeague ? "text" : "select"}
                value={useCustomLeague ? newMatch.customLeague : newMatch.league}
                onChange={(value) => {
                  if (useCustomLeague) {
                    setNewMatch({ ...newMatch, customLeague: value });
                  } else {
                    setNewMatch({ ...newMatch, league: value });
                  }
                }}
                options={useCustomLeague ? undefined : (useCustomSport ? [] : (newMatch.sport ? LEAGUES[newMatch.sport as keyof typeof LEAGUES] : []))}
                placeholder={useCustomLeague ? "Enter custom league" : (useCustomSport || !newMatch.sport ? "Select sport first" : "Choose a league")}
                disabled={useCustomLeague ? false : (useCustomSport ? false : !newMatch.sport)}
                autoComplete="off"
                statusIcon={
                  <button
                    type="button"
                    className={`inline-toggle ${useCustomLeague ? 'active' : ''}`}
                    onClick={() => {
                      setUseCustomLeague(!useCustomLeague);
                      setNewMatch({ ...newMatch, league: '', customLeague: '' });
                    }}
                    disabled={useCustomSport ? false : !newMatch.sport}
                  >
                    Custom
                  </button>
                }
              />
              <FormField
                label="Home Team"
                value={newMatch.team1}
                onChange={(value) => setNewMatch({ ...newMatch, team1: value })}
                placeholder="Enter home team name"
                autoComplete="off"
              />
              <FormField
                label="Away Team"
                value={newMatch.team2}
                onChange={(value) => setNewMatch({ ...newMatch, team2: value })}
                placeholder="Enter away team name"
                autoComplete="off"
              />
              <DateTimeField
                label="Match Date"
                type="date"
                value={newMatch.date}
                onChange={(value) => setNewMatch({ ...newMatch, date: value })}
                min={today}
              />
              <DateTimeField
                label="Kick-off Time"
                type="time"
                value={newMatch.time}
                onChange={(value) => setNewMatch({ ...newMatch, time: value })}
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
              <ArtistDropdown
                value={noMusic ? 'No Music' : newBand.name}
                selectedArtists={selectedArtists}
                disabled={noMusic}
                onValueChange={(value) => {
                  if (!noMusic) {
                    setNewBand({ ...newBand, name: value });
                    // Clear selected artists when manually editing
                    if (selectedArtists.length > 0 && value !== selectedArtists.join(', ')) {
                      setSelectedArtists([]);
                    }
                  }
                }}
                onAddArtist={handleAddArtistToList}
                onRemoveArtist={handleRemoveArtist}
              />
              <FormField
                label="Music Genre"
                type="select"
                value={noMusic ? 'No Music' : newBand.genre}
                onChange={(value) => {
                  if (!noMusic) {
                    setNewBand({ ...newBand, genre: value });
                  }
                }}
                options={GENRES}
                placeholder="Select music genre"
                disabled={noMusic}
              />
              <DateTimeField
                label="Performance Date"
                type="date"
                value={newBand.date}
                onChange={(value) => setNewBand({ ...newBand, date: value })}
                min={today}
              />
              <DateTimeField
                label="Start Time (default 22:00)"
                type="time"
                value={newBand.time}
                onChange={(value) => setNewBand({ ...newBand, time: value })}
                disabled={noMusic}
              />
            </div>
            <div className="form-actions">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: 'auto' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#c8b273',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <input
                    type="checkbox"
                    checked={noMusic}
                    onChange={(e) => {
                      setNoMusic(e.target.checked);
                      if (e.target.checked) {
                        setNewBand({ ...newBand, name: '', genre: '', time: '00:00' });
                        setSelectedArtists([]);
                      } else {
                        setNewBand({ ...newBand, name: '', genre: '', time: '22:00' });
                      }
                    }}
                    style={{
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer',
                      accentColor: '#c8b273'
                    }}
                  />
                  No Music This Day
                </label>
              </div>
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
                  {noMusic ? 'Mark No Music Day' : 'Add Band'}
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
            onClick={() => {/* Form is always visible now */}}
            variant="primary"
            icon={<Plus size={16} />}
            disabled={uploadingMenu}
          >
            Upload Menu
          </Button>
        </div>
        
        <Card className="admin-add-form" padding="lg">
          <form onSubmit={handleAddMenu}>
            <div className="form-grid">
              <FormField
                label="Menu Name"
                value={newMenu.name}
                onChange={(value) => setNewMenu({ ...newMenu, name: value })}
                placeholder="e.g., Weekend Brunch Menu"
                disabled={uploadingMenu}
              />
              <FormField
                label="Menu Type"
                type="select"
                value={newMenu.type}
                onChange={(value) => setNewMenu({ ...newMenu, type: value as 'food' | 'drinks' })}
                options={MENU_TYPES}
                placeholder="Select menu type"
                disabled={uploadingMenu}
              />
            </div>
            
            <div className="file-upload-section">
              <FileUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                selectedFile={newMenu.file}
                uploading={uploadingMenu}
                uploadProgress={uploadProgress}
                accept=".pdf"
                maxSize={10}
              />
            </div>
            
            <div className="form-actions">
              <Button 
                type="submit" 
                variant="primary" 
                size="lg"
                loading={uploadingMenu}
                disabled={!newMenu.name || !newMenu.type || !newMenu.file}
                icon={<Upload size={16} />}
              >
                {uploadingMenu ? 'Uploading...' : 'Upload Menu'}
              </Button>
            </div>
          </form>
        </Card>

        <div className="admin-items-grid">
          {menus.length === 0 ? (
            <Card className="admin-empty-state" padding="xl">
              <MenuIcon size={48} style={{ color: '#6b7280', marginBottom: '1rem' }} />
              <p>No menus uploaded yet. Upload your first menu!</p>
            </Card>
          ) : (
            menus.map((menu) => {
              const isActive = menu.is_active ?? false;
              const uploadDate = menu.upload_date || '';
              
              return (
                <Card key={menu.id} hoverable className="admin-item-card">
                  <div className="admin-item-header">
                    <h3 className="admin-item-title">{menu.name}</h3>
                    <div className="admin-item-actions">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Eye size={14} />}
                        onClick={() => handleViewMenu(menu)}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Download size={14} />}
                        onClick={() => handleViewMenu(menu)}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={<Trash2 size={14} />}
                        onClick={() => handleDeleteMenu(menu.id, menu.name)}
                      />
                    </div>
                  </div>
                  <div className="admin-item-content">
                    <p className="admin-item-meta">
                      {menu.type.charAt(0).toUpperCase() + menu.type.slice(1)} Menu
                    </p>
                    <p className="admin-item-date">
                      Uploaded: {uploadDate ? new Date(uploadDate).toLocaleDateString('en-GB', {
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      }) : 'Unknown date'}
                    </p>
                    <div className="admin-item-status">
                      <button
                        className={`status-badge ${isActive ? 'active' : 'inactive'} clickable`}
                        onClick={() => handleToggleMenuActive(menu.id, isActive)}
                        title="Click to toggle status"
                      >
                        {isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    );
  }

};

export default Admin;
