// Backend de persistência do Meteor Mayhem.
// Em produção, usa Supabase quando as variáveis VITE_SUPABASE_URL/KEY existem.
// Se o Supabase estiver indisponível, cai para localStorage para o jogo continuar funcionando.
import { supabase } from './supabase.js';

const LOCAL_PREFIX = 'meteor-mayhem:';
const TABLE = 'kv_store';
function localKey(key){ return LOCAL_PREFIX + key; }

async function onlineGet(key){
  const { data, error } = await supabase.from(TABLE).select('value').eq('key', key).maybeSingle();
  if(error) throw error;
  return data ? { value: data.value } : null;
}

async function onlineSet(key, value){
  const { error } = await supabase.from(TABLE).upsert({ key, value }, { onConflict:'key' });
  if(error) throw error;
  return { ok:true };
}

export async function storageGet(key){
  if(supabase){
    try{ return await onlineGet(key); }
    catch(e){ console.warn('Supabase indisponível; usando localStorage:', e.message); }
  }
  const value = localStorage.getItem(localKey(key));
  return value === null ? null : { value };
}

export async function storageSet(key, value){
  if(supabase){
    try{ return await onlineSet(key, value); }
    catch(e){ console.warn('Supabase indisponível; salvando localmente:', e.message); }
  }
  localStorage.setItem(localKey(key), value);
  return { ok:true };
}

export async function storageList(prefix=''){
  if(supabase){
    try{
      const { data, error } = await supabase.from(TABLE).select('key').like('key', `${prefix}%`).limit(500);
      if(error) throw error;
      return { keys: (data||[]).map(row=>row.key) };
    }catch(e){ console.warn('Supabase indisponível; listando localStorage:', e.message); }
  }
  const keys = [];
  const fullPrefix = localKey(prefix);
  for(let i=0;i<localStorage.length;i++){
    const k = localStorage.key(i);
    if(k && k.startsWith(fullPrefix)) keys.push(k.slice(LOCAL_PREFIX.length));
  }
  return { keys };
}

export function storageBackend(){
  return supabase ? 'supabase+local-fallback' : 'localStorage';
}
