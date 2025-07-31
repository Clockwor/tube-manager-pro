import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  FolderPlus,
  Calendar,
  Users,
  Tag,
  Globe,
  Settings
} from 'lucide-react';

interface ProjectFormData {
  name: string;
  description: string;
  channels: string[];
  category: string;
  targetLanguage: string;
  startDate: string;
  endDate: string;
}

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    channels: [],
    category: '',
    targetLanguage: 'tr',
    startDate: new Date().toISOString().split('T')[0],
    endDate: ''
  });

  const availableChannels = [
    'Kanal_A',
    'Kanal_B', 
    'Tech Channel',
    'Gaming Channel',
    'Education Channel'
  ];

  const categories = [
    'Eğitim',
    'Eğlence', 
    'Teknoloji',
    'Oyun',
    'Müzik',
    'Spor',
    'Haber',
    'Yaşam Tarzı',
    'Seyahat',
    'Yemek'
  ];

  const languages = [
    { code: 'tr', name: 'Türkçe' },
    { code: 'en', name: 'İngilizce' },
    { code: 'es', name: 'İspanyolca' },
    { code: 'fr', name: 'Fransızca' },
    { code: 'de', name: 'Almanca' },
    { code: 'it', name: 'İtalyanca' },
    { code: 'ar', name: 'Arapça' }
  ];

  const handleChannelToggle = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || formData.channels.length === 0) {
      toast({
        title: "Hata",
        description: "Proje adı ve en az bir kanal seçimi gerekli",
        variant: "destructive"
      });
      return;
    }

    // Proje oluşturma işlemi
    console.log('Creating project:', formData);
    
    // Folder structure oluşturma simülasyonu
    const folderStructure = {
      projectName: formData.name,
      folders: [
        'kaynak_videolar',
        'transkript',
        'bolunmus_sahneler',
        'ceviri',
        'montaj_plani', 
        'yayin',
        'logs'
      ]
    };
    
    console.log('Generated folder structure:', folderStructure);
    
    toast({
      title: "Başarılı",
      description: `"${formData.name}" projesi oluşturuldu ve klasör yapısı hazırlandı`,
    });

    // Formu sıfırla ve kapat
    setFormData({
      name: '',
      description: '',
      channels: [],
      category: '',
      targetLanguage: 'tr',
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-tube-gray/95 backdrop-blur-md border-tube-lightgray/30 text-tube-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FolderPlus className="h-6 w-6" />
            Yeni Proje Oluştur
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Proje Adı*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Örn: YouTube Shorts Projesi"
                className="bg-tube-gray/50 border-tube-lightgray/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="bg-tube-gray/50 border-tube-lightgray/30">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Proje hakkında kısa açıklama..."
              className="bg-tube-gray/50 border-tube-lightgray/30"
            />
          </div>

          <div className="space-y-2">
            <Label>YouTube Kanalları*</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableChannels.map(channel => (
                <label
                  key={channel}
                  className="flex items-center gap-2 p-3 rounded-lg bg-tube-gray/30 hover:bg-tube-gray/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.channels.includes(channel)}
                    onChange={() => handleChannelToggle(channel)}
                    className="rounded"
                  />
                  <span className="text-tube-white">{channel}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetLanguage">Hedef Dil</Label>
              <Select 
                value={formData.targetLanguage} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, targetLanguage: value }))}
              >
                <SelectTrigger className="bg-tube-gray/50 border-tube-lightgray/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-tube-gray border-tube-lightgray/30">
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Başlangıç Tarihi</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="bg-tube-gray/50 border-tube-lightgray/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Bitiş Tarihi</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="bg-tube-gray/50 border-tube-lightgray/30"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <h4 className="font-medium text-blue-300 mb-2 flex items-center gap-2">
              <FolderPlus className="h-4 w-4" />
              Otomatik Klasör Yapısı
            </h4>
            <p className="text-blue-200 text-sm mb-3">
              Proje oluşturulduğunda aşağıdaki klasör yapısı otomatik olarak hazırlanacak:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="bg-blue-500/20 rounded px-2 py-1">📁 kaynak_videolar</div>
              <div className="bg-blue-500/20 rounded px-2 py-1">📁 transkript</div>
              <div className="bg-blue-500/20 rounded px-2 py-1">📁 bolunmus_sahneler</div>
              <div className="bg-blue-500/20 rounded px-2 py-1">📁 ceviri</div>
              <div className="bg-blue-500/20 rounded px-2 py-1">📁 montaj_plani</div>
              <div className="bg-blue-500/20 rounded px-2 py-1">📁 yayin</div>
              <div className="bg-blue-500/20 rounded px-2 py-1">📁 logs</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-6 border-t border-tube-lightgray/30">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-tube-lightgray/30"
          >
            İptal
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Proje Oluştur
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;