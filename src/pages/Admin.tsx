import { useState, useEffect, useCallback } from 'react';
import {
  Lock, LogOut, Plus, Edit2, Trash2, Eye, EyeOff, X, Save, Loader2,
  AlertCircle, CheckCircle2, BookOpen, Eye as EyeIcon,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { EyeCondition } from './EyeConditions';
import type { EyeTopic } from './EyeTopics';

type Tab = 'conditions' | 'topics';

interface AdminProps {
  onNavigate: (path: string) => void;
}

export default function Admin({ onNavigate }: AdminProps) {
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  const [tab, setTab] = useState<Tab>('conditions');
  const [conditions, setConditions] = useState<EyeCondition[]>([]);
  const [topics, setTopics] = useState<EyeTopic[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [editingCondition, setEditingCondition] = useState<EyeCondition | null>(null);
  const [editingTopic, setEditingTopic] = useState<EyeTopic | null>(null);
  const [showConditionForm, setShowConditionForm] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session as { user: { email: string } } | null);
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess as { user: { email: string } } | null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchData = useCallback(async () => {
    setDataLoading(true);
    if (tab === 'conditions') {
      const { data } = await supabase.from('eye_conditions').select('*').order('sort_order', { ascending: true });
      setConditions((data || []) as EyeCondition[]);
    } else {
      const { data } = await supabase.from('eye_topics').select('*').order('published_at', { ascending: false });
      setTopics((data || []) as EyeTopic[]);
    }
    setDataLoading(false);
  }, [tab]);

  useEffect(() => {
    if (session) fetchData();
  }, [session, fetchData]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setSigningIn(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setEditingCondition(null);
    setEditingTopic(null);
    setShowConditionForm(false);
    setShowTopicForm(false);
  };

  const togglePublished = async (table: string, id: string, current: boolean) => {
    const { error } = await supabase.from(table).update({ published: !current }).eq('id', id);
    if (error) setSaveError(error.message);
    else fetchData();
  };

  const deleteItem = async (table: string, id: string) => {
    if (!confirm('Are you sure you want to delete this? This cannot be undone.')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) setSaveError(error.message);
    else fetchData();
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-20">
        <div className="w-full max-w-md px-4">
          <div className="card p-8">
            <div className="flex items-center justify-center gap-2.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                <Lock className="h-6 w-6 text-primary-600" />
              </div>
            </div>
            <h1 className="mt-4 text-center text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="mt-1 text-center text-sm text-slate-500">
              Sign in to manage eye conditions and articles.
            </p>
            {authError && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-error-50 p-3 text-sm text-error-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {authError}
              </div>
            )}
            <form onSubmit={handleSignIn} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="admin@skyvieweyecentre.com" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Your password" required />
              </div>
              <button type="submit" disabled={signingIn} className="btn-primary w-full disabled:opacity-60">
                {signingIn ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <button onClick={() => onNavigate('/')} className="mt-4 w-full text-center text-sm text-slate-400 hover:text-slate-600">
              Back to website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container-page py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Content Manager</h1>
            <p className="text-sm text-slate-500">Signed in as {session.user.email}</p>
          </div>
          <button onClick={handleSignOut} className="btn-secondary">
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>

        {saveError && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-error-50 p-3 text-sm text-error-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {saveError}
            <button onClick={() => setSaveError(null)} className="ml-auto text-error-500">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-6 flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setTab('conditions')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'conditions' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <EyeIcon className="h-4 w-4" />
            Eye Conditions
          </button>
          <button
            onClick={() => setTab('topics')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === 'topics' ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Eye Topics
          </button>
        </div>

        <div className="mt-6">
          {tab === 'conditions' && (
            <ListManager
              items={conditions.map((c) => ({ id: c.id, title: c.title, subtitle: c.category + ' — ' + c.summary, imageUrl: c.image_url, published: c.published }))}
              loading={dataLoading}
              onEdit={(id) => { const c = conditions.find((x) => x.id === id); if (c) { setEditingCondition(c); setShowConditionForm(true); } }}
              onNew={() => { setEditingCondition(null); setShowConditionForm(true); }}
              onTogglePub={(id, val) => togglePublished('eye_conditions', id, val)}
              onDelete={(id) => deleteItem('eye_conditions', id)}
              emptyText="No conditions yet. Click 'New Condition' to create one."
              newLabel="New Condition"
            />
          )}
          {tab === 'topics' && (
            <ListManager
              items={topics.map((t) => ({ id: t.id, title: t.title, subtitle: (t.category || 'Uncategorised') + ' — ' + t.excerpt, imageUrl: t.image_url, published: t.published }))}
              loading={dataLoading}
              onEdit={(id) => { const t = topics.find((x) => x.id === id); if (t) { setEditingTopic(t); setShowTopicForm(true); } }}
              onNew={() => { setEditingTopic(null); setShowTopicForm(true); }}
              onTogglePub={(id, val) => togglePublished('eye_topics', id, val)}
              onDelete={(id) => deleteItem('eye_topics', id)}
              emptyText="No articles yet. Click 'New Article' to create one."
              newLabel="New Article"
            />
          )}
        </div>
      </div>

      {showConditionForm && (
        <ConditionForm
          condition={editingCondition}
          saving={saving}
          onClose={() => setShowConditionForm(false)}
          onSave={async (data) => {
            setSaving(true);
            setSaveError(null);
            if (editingCondition) {
              const { error } = await supabase.from('eye_conditions').update(data).eq('id', editingCondition.id);
              if (error) { setSaveError(error.message); setSaving(false); return; }
            } else {
              const { error } = await supabase.from('eye_conditions').insert(data);
              if (error) { setSaveError(error.message); setSaving(false); return; }
            }
            setSaving(false);
            setShowConditionForm(false);
            fetchData();
          }}
        />
      )}

      {showTopicForm && (
        <TopicForm
          topic={editingTopic}
          saving={saving}
          onClose={() => setShowTopicForm(false)}
          onSave={async (data) => {
            setSaving(true);
            setSaveError(null);
            if (editingTopic) {
              const { error } = await supabase.from('eye_topics').update(data).eq('id', editingTopic.id);
              if (error) { setSaveError(error.message); setSaving(false); return; }
            } else {
              const { error } = await supabase.from('eye_topics').insert(data);
              if (error) { setSaveError(error.message); setSaving(false); return; }
            }
            setSaving(false);
            setShowTopicForm(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}

// ── Shared List Manager ──
interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  published: boolean;
}

function ListManager({
  items, loading, onEdit, onNew, onTogglePub, onDelete, emptyText, newLabel,
}: {
  items: ListItem[];
  loading: boolean;
  onEdit: (id: string) => void;
  onNew: () => void;
  onTogglePub: (id: string, val: boolean) => void;
  onDelete: (id: string) => void;
  emptyText: string;
  newLabel: string;
}) {
  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary-600" /></div>;
  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={onNew} className="btn-primary">
          <Plus className="h-4 w-4" />
          {newLabel}
        </button>
      </div>
      {items.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-500">{emptyText}</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="card flex items-center gap-4 p-4">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="h-14 w-14 rounded-lg object-cover" />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100">
                  <EyeIcon className="h-6 w-6 text-slate-300" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  {item.published ? (
                    <span className="badge bg-success-50 text-success-700"><CheckCircle2 className="h-3 w-3" />Published</span>
                  ) : (
                    <span className="badge bg-slate-100 text-slate-500">Draft</span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{item.subtitle}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onTogglePub(item.id, item.published)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" title={item.published ? 'Unpublish' : 'Publish'}>
                  {item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button onClick={() => onEdit(item.id)} className="rounded-lg p-2 text-primary-600 hover:bg-primary-50" title="Edit">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => onDelete(item.id)} className="rounded-lg p-2 text-error-600 hover:bg-error-50" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Condition Form ──
function ConditionForm({
  condition, saving, onClose, onSave,
}: {
  condition: EyeCondition | null;
  saving: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [title, setTitle] = useState(condition?.title || '');
  const [slug, setSlug] = useState(condition?.slug || '');
  const [category, setCategory] = useState(condition?.category || '');
  const [summary, setSummary] = useState(condition?.summary || '');
  const [imageUrl, setImageUrl] = useState(condition?.image_url || '');
  const [symptoms, setSymptoms] = useState((condition?.symptoms || []).join('\n'));
  const [homeCare, setHomeCare] = useState((condition?.home_care || []).join('\n'));
  const [whenToSeek, setWhenToSeek] = useState((condition?.when_to_seek_help || []).join('\n'));
  const [published, setPublished] = useState(condition?.published ?? true);
  const [sortOrder, setSortOrder] = useState(condition?.sort_order ?? 0);

  const autoSlug = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      slug: (slug || autoSlug(title)),
      category: category.trim(),
      summary: summary.trim(),
      image_url: imageUrl.trim() || null,
      symptoms: symptoms.split('\n').map((s) => s.trim()).filter(Boolean),
      home_care: homeCare.split('\n').map((s) => s.trim()).filter(Boolean),
      when_to_seek_help: whenToSeek.split('\n').map((s) => s.trim()).filter(Boolean),
      published,
      sort_order: Number(sortOrder),
    });
  };

  return (
    <ModalForm title={condition ? 'Edit Condition' : 'New Condition'} onClose={onClose} saving={saving} onSubmit={handleSubmit} submitLabel={condition ? 'Save Changes' : 'Create'}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title *">
          <input value={title} onChange={(e) => { setTitle(e.target.value); if (!condition) setSlug(autoSlug(e.target.value)); }} className="input-field" required />
        </Field>
        <Field label="Slug (URL) *">
          <input value={slug} onChange={(e) => setSlug(e.target.value)} className="input-field" placeholder="auto-generated" required />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category *">
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="input-field" placeholder="e.g. Eye Infections" required />
        </Field>
        <Field label="Image URL">
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input-field" placeholder="https://..." />
        </Field>
      </div>
      <Field label="Summary *">
        <input value={summary} onChange={(e) => setSummary(e.target.value)} className="input-field" required />
      </Field>
      <TextAreaField label="Symptoms" hint="one per line">
        <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={5} className="input-field resize-none" />
      </TextAreaField>
      <TextAreaField label="Home Care Tips" hint="one per line">
        <textarea value={homeCare} onChange={(e) => setHomeCare(e.target.value)} rows={5} className="input-field resize-none" />
      </TextAreaField>
      <TextAreaField label="When to Seek Professional Help" hint="one per line">
        <textarea value={whenToSeek} onChange={(e) => setWhenToSeek(e.target.value)} rows={5} className="input-field resize-none" />
      </TextAreaField>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Sort Order">
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="input-field" />
        </Field>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-primary-600" />
            Published
          </label>
        </div>
      </div>
    </ModalForm>
  );
}

// ── Topic Form ──
function TopicForm({
  topic, saving, onClose, onSave,
}: {
  topic: EyeTopic | null;
  saving: boolean;
  onClose: () => void;
  onSave: (data: Record<string, unknown>) => void;
}) {
  const [title, setTitle] = useState(topic?.title || '');
  const [slug, setSlug] = useState(topic?.slug || '');
  const [excerpt, setExcerpt] = useState(topic?.excerpt || '');
  const [content, setContent] = useState(topic?.content || '');
  const [author, setAuthor] = useState(topic?.author || '');
  const [category, setCategory] = useState(topic?.category || '');
  const [imageUrl, setImageUrl] = useState(topic?.image_url || '');
  const [published, setPublished] = useState(topic?.published ?? true);

  const autoSlug = (str: string) =>
    str.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      slug: (slug || autoSlug(title)),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim() || null,
      category: category.trim() || null,
      image_url: imageUrl.trim() || null,
      published,
    });
  };

  return (
    <ModalForm title={topic ? 'Edit Article' : 'New Article'} onClose={onClose} saving={saving} onSubmit={handleSubmit} submitLabel={topic ? 'Save Changes' : 'Create'}>
      <Field label="Title *">
        <input value={title} onChange={(e) => { setTitle(e.target.value); if (!topic) setSlug(autoSlug(e.target.value)); }} className="input-field" required />
      </Field>
      <Field label="Slug (URL) *">
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className="input-field" placeholder="auto-generated" required />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Author">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="input-field" placeholder="Dr. Tan Wei Ming" />
        </Field>
        <Field label="Category">
          <input value={category} onChange={(e) => setCategory(e.target.value)} className="input-field" placeholder="Eye Health Tips" />
        </Field>
      </div>
      <Field label="Image URL">
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input-field" placeholder="https://..." />
      </Field>
      <Field label="Short Summary *">
        <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="input-field" required />
      </Field>
      <TextAreaField label="Article Content *" hint="separate paragraphs with a blank line">
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="input-field resize-none" required />
      </TextAreaField>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-primary-600" />
        Published
      </label>
    </ModalForm>
  );
}

// ── Shared Form Components ──
function ModalForm({
  title, onClose, saving, onSubmit, submitLabel, children,
}: {
  title: string;
  onClose: () => void;
  saving: boolean;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-4 pt-20">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-5 p-6">
          {children}
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function TextAreaField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label} {hint && <span className="text-slate-400">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
