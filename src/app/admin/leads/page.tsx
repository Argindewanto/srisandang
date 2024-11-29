'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  getLeads, 
  updateLeadStatus, 
  updateLeadPanggilan, 
  type Lead 
} from '@/lib/firebase/leads';
import { Loader2, Mail, Search, Calendar } from 'lucide-react';
import { formatDistanceToNow, format, subDays } from 'date-fns';
import { id } from 'date-fns/locale';

type DateRange = {
  from: Date | null;
  to: Date | null;
};

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'new' | 'contacted' | 'closed' | ''>('');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getLeads({
        status: selectedStatus || undefined,
        searchQuery: searchQuery || undefined,
        dateRange: dateRange.from && dateRange.to ? {
          from: dateRange.from,
          to: dateRange.to,
        } : undefined,
      });
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setError(error instanceof Error ? error.message : 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [selectedStatus, dateRange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-600 bg-blue-50';
      case 'contacted':
        return 'text-yellow-600 bg-yellow-50';
      case 'closed':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new':
        return 'Baru';
      case 'contacted':
        return 'Sudah Dihubungi';
      case 'closed':
        return 'Selesai';
      default:
        return status;
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: 'new' | 'contacted' | 'closed') => {
    try {
      await updateLeadStatus(leadId, newStatus);
      fetchLeads();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const formatQtyRange = (qtyRange: string) => {
    switch (qtyRange) {
      case '< 50':
        return 'Kurang dari 50 pcs';
      case '50 - 100':
        return '50 - 100 pcs';
      case '100 - 200':
        return '100 - 200 pcs';
      case '200 - 300':
        return '200 - 300 pcs';
      case '300 - 500':
        return '300 - 500 pcs';
      case '500 - 1000':
        return '500 - 1000 pcs';
      case '> 1000':
        return 'Lebih dari 1000 pcs';
      default:
        return qtyRange;
    }
  };

  const formatWhatsAppNumber = (phone: string) => {
    // Remove all non-digits
    const cleanNumber = phone.replace(/\D/g, '');
    
    // If starts with '0', replace with '62'
    if (cleanNumber.startsWith('0')) {
      return '62' + cleanNumber.substring(1);
    }
    
    // If starts with '62' or '+62', ensure it starts with just '62'
    if (cleanNumber.startsWith('62')) {
      return cleanNumber;
    }
    
    // Default case: add '62' prefix
    return '62' + cleanNumber;
  };

  const generateWhatsAppMessage = (lead: Lead) => {
    const message = `Halo ${lead.panggilan} ${lead.name}. Saya Ninda dari Srisandang.

Saya dapat nomor ${lead.panggilan} dari website kami.

Jika boleh, mohon di info ke saya kebutuhan baju/merchandise ${lead.panggilan} seperti apa? biar saya bantu hitungkan estimasi pembuatan dan harganya`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = async (lead: Lead) => {
    // Update status to 'contacted' if it's currently 'new'
    if (lead.status === 'new') {
      try {
        await updateLeadStatus(lead.id!, 'contacted');
        fetchLeads(); // Refresh the list
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    }

    // Open WhatsApp
    window.open(
      `https://wa.me/${formatWhatsAppNumber(lead.phone)}?text=${generateWhatsAppMessage(lead)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Dashboard
              </button>
              <span className="text-neutral-900">Leads Management</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-h2 text-neutral-900">Leads</h1>
          <p className="text-body-lg text-neutral-600 mt-1">
            Manage catalogue access requests and leads
          </p>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
          {/* Filters */}
          <div className="border-b border-neutral-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Cari leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md text-body-sm"
                />
              </div>

              <div className="flex gap-2 items-center">
                <Calendar className="h-5 w-5 text-neutral-400" />
                <input
                  type="date"
                  value={dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setDateRange(prev => ({
                    ...prev,
                    from: e.target.value ? new Date(e.target.value) : null
                  }))}
                  className="px-3 py-2 border border-neutral-200 rounded-md text-body-sm"
                />
                <span className="text-neutral-400">to</span>
                <input
                  type="date"
                  value={dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''}
                  onChange={(e) => setDateRange(prev => ({
                    ...prev,
                    to: e.target.value ? new Date(e.target.value) : null
                  }))}
                  className="px-3 py-2 border border-neutral-200 rounded-md text-body-sm"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-4 py-2 border border-neutral-200 rounded-md text-body-sm"
              >
                <option value="">Semua Status</option>
                <option value="new">Baru</option>
                <option value="contacted">Sudah Dihubungi</option>
                <option value="closed">Selesai</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {error && (
              <div className="text-center py-8">
                <p className="text-red-500 text-body-sm">{error}</p>
                <button
                  onClick={fetchLeads}
                  className="mt-2 text-brand-primary hover:text-brand-primary-dark"
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {loading && !error && (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400 mx-auto" />
                <p className="mt-2 text-neutral-600 text-body-sm">Memuat data leads...</p>
              </div>
            )}

            {!loading && !error && leads.length === 0 && (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <p className="text-neutral-600 text-body-lg">Tidak ada leads ditemukan</p>
              </div>
            )}

            {!loading && !error && leads.length > 0 && (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="border border-neutral-200 rounded-lg p-4 hover:border-brand-primary transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Lead Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-body-lg text-neutral-900">
                                {lead.name}
                              </h3>
                              <select
                                value={lead.panggilan}
                                onChange={async (e) => {
                                  try {
                                    // Here you would need to add a new function to update the panggilan
                                    // For now, we'll just refresh the list
                                    await updateLeadPanggilan(lead.id!, e.target.value as 'Kakak' | 'Bapak' | 'Ibu');
                                    fetchLeads();
                                  } catch (error) {
                                    console.error('Failed to update panggilan:', error);
                                  }
                                }}
                                className="text-body-sm border border-neutral-200 rounded px-2 py-1"
                              >
                                <option value="Kakak">Kakak</option>
                                <option value="Bapak">Bapak</option>
                                <option value="Ibu">Ibu</option>
                              </select>
                            </div>
                            <p className="text-body-sm text-neutral-600 font-medium">
                              {lead.company}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`px-2 py-1 rounded-full text-body-sm ${getStatusColor(lead.status)}`}>
                              {getStatusLabel(lead.status)}
                            </span>
                            <span className="text-body-sm text-neutral-500">
                              {formatQtyRange(lead.qtyRange)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-body-sm text-neutral-600">
                              <strong>Email:</strong> {lead.email}
                            </span>
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-brand-primary hover:text-brand-primary-dark"
                              title="Kirim Email"
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          </div>
                          <p className="text-body-sm text-neutral-600">
                            <strong>Telepon:</strong> {lead.phone}
                          </p>
                          <p className="text-body-sm text-neutral-500">
                            Dikirim {formatDistanceToNow(new Date(lead.createdAt!), { 
                              addSuffix: true,
                              locale: id 
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col gap-2">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id!, e.target.value as any)}
                          className={`px-3 py-1.5 border border-neutral-200 rounded-md text-body-sm ${
                            lead.status === 'new' ? 'bg-blue-50' :
                            lead.status === 'contacted' ? 'bg-yellow-50' :
                            lead.status === 'closed' ? 'bg-green-50' : ''
                          }`}
                        >
                          <option value="new">Baru</option>
                          <option value="contacted">Sudah Dihubungi</option>
                          <option value="closed">Selesai</option>
                        </select>
                        <button
                          onClick={() => handleWhatsAppClick(lead)}
                          className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-body-sm text-center"
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 