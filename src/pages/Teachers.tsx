import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, Search, X, UserCheck, Award, BookOpen } from 'lucide-react';
import { Teacher, EDUCATION_LEVELS, Subject } from '../types';
import { useFirestore } from '../hooks/useFirestore';
import { useToast } from '../hooks/useToast';
import { useConfirmation } from '../hooks/useConfirmation';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import ConfirmationModal from '../components/UI/ConfirmationModal';

const Teachers = () => {
  const { data: teachers, loading, add, update, remove } = useFirestore<Teacher>('teachers');
  const { data: subjects } = useFirestore<Subject>('subjects');
  const { success, error, warning } = useToast();
  const { 
    confirmation, 
    showConfirmation, 
    hideConfirmation,
    confirmDelete 
  } = useConfirmation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [levelFilter, setLevelFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [bulkTeachers, setBulkTeachers] = useState([
    { name: '', branch: '', level: '' }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    level: ''
  });

  // Get unique branches from subjects
  const getUniqueBranches = () => {
    const branches = [...new Set(subjects.map(subject => subject.branch))];
    return branches.sort((a, b) => a.localeCompare(b, 'tr'));
  };

  // Filter teachers
  const getFilteredTeachers = () => {
    return teachers.filter(teacher => {
      const matchesLevel = !levelFilter || teacher.level === levelFilter;
      const matchesBranch = !branchFilter || teacher.branch === branchFilter;
      const matchesSearch = !searchQuery || 
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.branch.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesLevel && matchesBranch && matchesSearch;
    });
  };

  const sortedTeachers = getFilteredTeachers().sort((a, b) => a.name.localeCompare(b.name, 'tr'));

  // Delete all teachers function
  const handleDeleteAllTeachers = () => {
    if (teachers.length === 0) {
      warning('⚠️ Silinecek Öğretmen Yok', 'Sistemde silinecek öğretmen bulunamadı');
      return;
    }

    confirmDelete(
      `${teachers.length} Öğretmen`,
      async () => {
        setIsDeletingAll(true);
        
        try {
          let deletedCount = 0;
          
          for (const teacher of teachers) {
            try {
              await remove(teacher.id);
              deletedCount++;
            } catch (err) {
              console.error(`❌ Öğretmen silinemedi: ${teacher.name}`, err);
            }
          }

          if (deletedCount > 0) {
            success('🗑️ Öğretmenler Silindi', `${deletedCount} öğretmen başarıyla silindi`);
            setLevelFilter('');
            setBranchFilter('');
            setSearchQuery('');
          } else {
            error('❌ Silme Hatası', 'Hiçbir öğretmen silinemedi');
          }

        } catch (err) {
          console.error('❌ Toplu silme hatası:', err);
          error('❌ Silme Hatası', 'Öğretmenler silinirken bir hata oluştu');
        } finally {
          setIsDeletingAll(false);
        }
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTeacher) {
      await update(editingTeacher.id, formData);
    } else {
      await add(formData as Omit<Teacher, 'id' | 'createdAt'>);
    }
    
    resetForm();
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    for (const teacher of bulkTeachers) {
      if (teacher.name && teacher.branch && teacher.level) {
        if (EDUCATION_LEVELS.includes(teacher.level as any)) {
          await add({
            name: teacher.name,
            branch: teacher.branch,
            level: teacher.level as Teacher['level']
          } as Omit<Teacher, 'id' | 'createdAt'>);
        }
      }
    }
    
    setBulkTeachers([{ name: '', branch: '', level: '' }]);
    setIsBulkModalOpen(false);
  };

  const resetForm = () => {
    setFormData({ name: '', branch: '', level: '' });
    setEditingTeacher(null);
    setIsModalOpen(false);
  };

  const handleEdit = (teacher: Teacher) => {
    setFormData({
      name: teacher.name,
      branch: teacher.branch,
      level: teacher.level
    });
    setEditingTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
      confirmDelete(
        teacher.name,
        async () => {
          await remove(id);
          success('🗑️ Öğretmen Silindi', `${teacher.name} başarıyla silindi`);
        }
      );
    }
  };

  const addBulkRow = () => {
    setBulkTeachers([...bulkTeachers, { name: '', branch: '', level: '' }]);
  };

  const removeBulkRow = (index: number) => {
    if (bulkTeachers.length > 1) {
      setBulkTeachers(bulkTeachers.filter((_, i) => i !== index));
    }
  };

  const updateBulkRow = (index: number, field: string, value: string) => {
    const updated = [...bulkTeachers];
    updated[index] = { ...updated[index], [field]: value };
    setBulkTeachers(updated);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      target.blur();
    }
    
    if (e.key === 'Escape') {
      clearSearch();
      const target = e.target as HTMLInputElement;
      target.blur();
    }
  };

  const levelOptions = EDUCATION_LEVELS.map(level => ({
    value: level,
    label: level
  }));

  const branchOptions = getUniqueBranches().map(branch => ({
    value: branch,
    label: branch
  }));

  const levelFilterOptions = [
    { value: '', label: 'Tüm Seviyeler' },
    ...levelOptions
  ];

  const branchFilterOptions = [
    { value: '', label: 'Tüm Branşlar' },
    ...branchOptions
  ];

  if (loading) {
    return (
      <div className="loading-professional">
        <div className="loading-spinner-professional"></div>
        <div className="loading-text-professional">Öğretmenler yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-professional">
      {/* Professional Header */}
      <div className="professional-header p-6 rounded-xl mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-professional-heading">Öğretmen Yönetimi</h1>
              <p className="text-professional-subtitle">
                {teachers.length} öğretmen kayıtlı • {sortedTeachers.length} gösteriliyor
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            {teachers.length > 0 && (
              <Button
                onClick={handleDeleteAllTeachers}
                icon={Trash2}
                variant="danger"
                disabled={isDeletingAll}
                className="w-full sm:w-auto"
              >
                {isDeletingAll ? 'Siliniyor...' : `Tümünü Sil (${teachers.length})`}
              </Button>
            )}
            
            <Button
              onClick={() => setIsBulkModalOpen(true)}
              icon={Plus}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Toplu Ekle
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              icon={Plus}
              variant="ide-primary"
              className="w-full sm:w-auto"
            >
              Yeni Öğretmen
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="professional-card mb-8">
        <div className="professional-card-content">
          {/* Search */}
          <div className="professional-form-group">
            <label className="professional-label">
              <Search className="w-4 h-4 inline mr-2" />
              Öğretmen Ara
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Öğretmen adı veya branş ara..."
                className="professional-input pl-10 pr-10"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
                  title="Aramayı temizle"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 flex items-center justify-between">
                <p className="text-sm text-blue-600">
                  <Search className="w-4 h-4 inline mr-1" />
                  "{searchQuery}" için {sortedTeachers.length} sonuç bulundu
                </p>
                <button
                  onClick={clearSearch}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Temizle
                </button>
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="grid-professional-2">
            <Select
              label="Seviye Filtresi"
              value={levelFilter}
              onChange={setLevelFilter}
              options={levelFilterOptions}
            />
            <Select
              label="Branş Filtresi"
              value={branchFilter}
              onChange={setBranchFilter}
              options={branchFilterOptions}
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid-professional-4 mb-8">
        <div className="stats-card-professional">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="stats-number-professional">{teachers.length}</div>
          <div className="stats-label-professional">Toplam Öğretmen</div>
        </div>
        
        <div className="stats-card-professional">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
          <div className="stats-number-professional">{getUniqueBranches().length}</div>
          <div className="stats-label-professional">Farklı Branş</div>
        </div>
        
        <div className="stats-card-professional">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="stats-number-professional">{EDUCATION_LEVELS.length}</div>
          <div className="stats-label-professional">Eğitim Seviyesi</div>
        </div>
        
        <div className="stats-card-professional">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <UserCheck className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="stats-number-professional">{sortedTeachers.length}</div>
          <div className="stats-label-professional">Filtrelenen</div>
        </div>
      </div>

      {sortedTeachers.length === 0 ? (
        <div className="professional-card">
          <div className="empty-state-professional">
            <Users className="empty-state-icon-professional" />
            <h3 className="empty-state-title-professional">
              {teachers.length === 0 ? 'Henüz öğretmen eklenmemiş' : 
               searchQuery ? 'Arama sonucu bulunamadı' : 'Filtrelere uygun öğretmen bulunamadı'}
            </h3>
            <p className="empty-state-description-professional">
              {teachers.length === 0 ? 'İlk öğretmeninizi ekleyerek başlayın' : 
               searchQuery ? `"${searchQuery}" araması için sonuç bulunamadı` : 'Farklı filtre kriterleri deneyin'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {teachers.length === 0 && (
                <>
                  <Button
                    onClick={() => setIsBulkModalOpen(true)}
                    icon={Plus}
                    variant="secondary"
                  >
                    Toplu Ekle
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    icon={Plus}
                    variant="ide-primary"
                  >
                    Öğretmen Ekle
                  </Button>
                </>
              )}
              {(searchQuery || levelFilter || branchFilter) && (
                <div className="flex flex-col sm:flex-row gap-3">
                  {searchQuery && (
                    <Button onClick={clearSearch} variant="secondary">
                      Aramayı Temizle
                    </Button>
                  )}
                  {(levelFilter || branchFilter) && (
                    <Button 
                      onClick={() => {
                        setLevelFilter('');
                        setBranchFilter('');
                      }} 
                      variant="secondary"
                    >
                      Filtreleri Temizle
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="professional-card">
          <div className="overflow-x-auto">
            <table className="professional-table">
              <thead className="professional-table-header">
                <tr>
                  <th className="professional-table-cell text-left">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Ad Soyad
                    </div>
                  </th>
                  <th className="professional-table-cell text-left">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Branş
                    </div>
                  </th>
                  <th className="professional-table-cell text-left">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      Seviye
                    </div>
                  </th>
                  <th className="professional-table-cell text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedTeachers.map((teacher) => (
                  <tr key={teacher.id} className="professional-table-row">
                    <td className="professional-table-cell">
                      <div className="flex items-center">
                        <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{teacher.name}</div>
                          <div className="text-sm text-gray-500">Öğretmen</div>
                        </div>
                      </div>
                    </td>
                    <td className="professional-table-cell">
                      <div className="badge-info">{teacher.branch}</div>
                    </td>
                    <td className="professional-table-cell">
                      <span className={`badge-professional ${
                        teacher.level === 'Anaokulu' ? 'bg-green-100 text-green-800' :
                        teacher.level === 'İlkokul' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {teacher.level}
                      </span>
                    </td>
                    <td className="professional-table-cell text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          onClick={() => handleEdit(teacher)}
                          icon={Edit}
                          size="sm"
                          variant="secondary"
                        >
                          Düzenle
                        </Button>
                        <Button
                          onClick={() => handleDelete(teacher.id)}
                          icon={Trash2}
                          size="sm"
                          variant="danger"
                        >
                          Sil
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Single Teacher Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingTeacher ? 'Öğretmen Düzenle' : 'Yeni Öğretmen Ekle'}
      >
        <form onSubmit={handleSubmit} className="space-professional">
          <Input
            label="Ad Soyad"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Örn: Ahmet Yılmaz"
            required
          />
          
          <Select
            label="Branş"
            value={formData.branch}
            onChange={(value) => setFormData({ ...formData, branch: value })}
            options={branchOptions}
            required
          />
          
          <Select
            label="Eğitim Seviyesi"
            value={formData.level}
            onChange={(value) => setFormData({ ...formData, level: value })}
            options={levelOptions}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={resetForm}
              variant="secondary"
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="ide-primary"
            >
              {editingTeacher ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Bulk Add Modal */}
      <Modal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        title="Toplu Öğretmen Ekleme"
        size="lg"
      >
        <form onSubmit={handleBulkSubmit} className="space-professional">
          <div className="professional-form-group">
            <div className="flex items-center justify-between mb-4">
              <label className="professional-label">
                Öğretmen Listesi
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Button
                type="button"
                onClick={addBulkRow}
                variant="secondary"
                size="sm"
              >
                + Satır Ekle
              </Button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {bulkTeachers.map((teacher, index) => (
                <div key={index} className="grid grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    value={teacher.name}
                    onChange={(e) => updateBulkRow(index, 'name', e.target.value)}
                    className="professional-input"
                    required
                  />
                  <select
                    value={teacher.branch}
                    onChange={(e) => updateBulkRow(index, 'branch', e.target.value)}
                    className="professional-select"
                    required
                  >
                    <option value="">Branş Seçin</option>
                    {branchOptions.map(branch => (
                      <option key={branch.value} value={branch.value}>{branch.label}</option>
                    ))}
                  </select>
                  <select
                    value={teacher.level}
                    onChange={(e) => updateBulkRow(index, 'level', e.target.value)}
                    className="professional-select"
                    required
                  >
                    <option value="">Seviye</option>
                    {EDUCATION_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeBulkRow(index)}
                    className="btn-professional-danger text-sm"
                    disabled={bulkTeachers.length === 1}
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="notification-info">
            <h4 className="font-medium text-blue-800 mb-2">Örnek Öğretmenler:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Ahmet Yılmaz - Matematik - İlkokul</p>
              <p>• Ayşe Demir - Türkçe - Ortaokul</p>
              <p>• Mehmet Kaya - Fen Bilimleri - İlkokul</p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={() => setIsBulkModalOpen(false)}
              variant="secondary"
            >
              İptal
            </Button>
            <Button
              type="submit"
              variant="ide-primary"
            >
              Toplu Ekle ({bulkTeachers.filter(t => t.name && t.branch && t.level).length} öğretmen)
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmation.isOpen}
        onClose={hideConfirmation}
        onConfirm={confirmation.onConfirm}
        title={confirmation.title}
        message={confirmation.message}
        type={confirmation.type}
        confirmText={confirmation.confirmText}
        cancelText={confirmation.cancelText}
        confirmVariant={confirmation.confirmVariant}
      />
    </div>
  );
};

export default Teachers;