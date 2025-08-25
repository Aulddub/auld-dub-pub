// Database service using Supabase
import { supabase, MenuPDF } from '../config/supabase';

// Common interfaces
export interface DatabaseMatch {
  id: string;
  sport: string;
  league: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
}

export interface DatabaseBand {
  id: string;
  name: string;
  genre: string;
  date: string;
  time: string;
}

export interface DatabaseMenu {
  id: string;
  name: string;
  type: 'food' | 'drinks';
  file_url: string;
  file_name: string;
  is_active: boolean;
  upload_date: string;
}

// Supabase implementation
class SupabaseService {
  async getMatches(): Promise<DatabaseMatch[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  async addMatch(match: Omit<DatabaseMatch, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('matches')
      .insert([match]);
    
    if (error) throw error;
  }

  async updateMatch(id: string, match: Omit<DatabaseMatch, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('matches')
      .update(match)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteMatch(id: string): Promise<void> {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  async getBands(): Promise<DatabaseBand[]> {
    const { data, error } = await supabase
      .from('bands')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  async addBand(band: Omit<DatabaseBand, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('bands')
      .insert([band]);
    
    if (error) throw error;
  }

  async updateBand(id: string, band: Omit<DatabaseBand, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('bands')
      .update(band)
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteBand(id: string): Promise<void> {
    const { error } = await supabase
      .from('bands')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  async getMenus(): Promise<DatabaseMenu[]> {
    const { data, error } = await supabase
      .from('menus')
      .select('*')
      .order('upload_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  async getLatestBands(limitCount: number = 3): Promise<DatabaseBand[]> {
    const { data, error } = await supabase
      .from('bands')
      .select('*')
      .order('date', { ascending: false })
      .limit(limitCount);
    
    if (error) throw error;
    return data || [];
  }

  // File upload specific to Supabase
  async uploadFile(file: File, bucket: string, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);
    
    return urlData.publicUrl;
  }

  async addMenu(menu: Omit<MenuPDF, 'id' | 'created_at'>): Promise<void> {
    const { error } = await supabase
      .from('menus')
      .insert([{
        name: menu.name,
        type: menu.type,
        file_url: menu.file_url,
        file_name: menu.file_name,
        is_active: menu.is_active,
        upload_date: menu.upload_date
      }]);
    
    if (error) throw error;
  }

  async updateMenu(id: string, menu: Partial<MenuPDF>): Promise<void> {
    const { error } = await supabase
      .from('menus')
      .update({
        name: menu.name,
        type: menu.type,
        file_url: menu.file_url,
        file_name: menu.file_name,
        is_active: menu.is_active,
        upload_date: menu.upload_date
      })
      .eq('id', id);
    
    if (error) throw error;
  }

  async deleteMenu(id: string): Promise<void> {
    const { error } = await supabase
      .from('menus')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
}

// Export singleton instance
export const databaseService = new SupabaseService();