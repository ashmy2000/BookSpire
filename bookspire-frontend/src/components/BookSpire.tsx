import { useState } from 'react';
import { 
  Home, 
  Library, 
  Users, 
  Search, 
  User,
  BookOpen,
  CheckCircle,
  Flame,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import bookCover1 from '@/assets/book-cover-1.jpg';
import bookCover2 from '@/assets/book-cover-2.jpg';
import bookCover3 from '@/assets/book-cover-3.jpg';
import bookCover4 from '@/assets/book-cover-4.jpg';

type Tab = 'home' | 'library' | 'connect' | 'explore' | 'profile';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress?: number;
  rating?: number;
  isFinished?: boolean;
}

const BookSpire = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const userName = "Ashmy";

  // Mock data
  const stats = {
    reading: 2,
    finished: 2,
    allBooks: 2,
    streak: 34
  };

  const currentlyReading: Book[] = [
    { id: '1', title: 'The Design of Everyday Things', author: 'Don Norman', cover: bookCover1, progress: 65 },
    { id: '2', title: 'Atomic Habits', author: 'James Clear', cover: bookCover2, progress: 32 }
  ];

  const allBooks: Book[] = [
    ...currentlyReading,
    { id: '3', title: 'The Psychology of Design', author: 'Various', cover: bookCover3 },
    { id: '4', title: 'Digital Minimalism', author: 'Cal Newport', cover: bookCover4 },
    { id: '5', title: 'The Lean Startup', author: 'Eric Ries', cover: bookCover1 },
    { id: '6', title: 'Thinking Fast and Slow', author: 'Daniel Kahneman', cover: bookCover2 }
  ];

  const finishedBooks: Book[] = [
    { id: '7', title: 'The Power of Now', author: 'Eckhart Tolle', cover: bookCover3, rating: 5, isFinished: true },
    { id: '8', title: 'Sapiens', author: 'Yuval Noah Harari', cover: bookCover4, rating: 4, isFinished: true }
  ];

  const readNext: Book[] = [
    { id: '9', title: 'Deep Work', author: 'Cal Newport', cover: bookCover1 },
    { id: '10', title: 'The 7 Habits', author: 'Stephen Covey', cover: bookCover2 }
  ];

  const StatCard = ({ icon: Icon, label, value, iconColor }: { 
    icon: any, 
    label: string, 
    value: number, 
    iconColor: string 
  }) => (
    <div className="stat-card">
      <div className={`text-2xl mb-2 ${iconColor}`}>
        <Icon size={28} />
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );

  const BookCover = ({ book, showProgress = false, size = 'small' }: { 
    book: Book, 
    showProgress?: boolean, 
    size?: 'small' | 'medium' 
  }) => {
    const dimensions = size === 'medium' ? 'w-20 h-28' : 'w-16 h-22';
    
    return (
      <div className="flex flex-col space-y-2">
        <div className={`${dimensions} book-cover relative overflow-hidden`}>
          <img 
            src={book.cover} 
            alt={book.title}
            className="w-full h-full object-cover"
          />
          {book.isFinished && (
            <div className="absolute bottom-1 left-1 bg-white/90 rounded p-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={8} 
                    className={i < (book.rating || 0) ? 'text-accent fill-accent' : 'text-muted-foreground'} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {showProgress && book.progress && (
          <div className="w-full">
            <div className="progress-bar h-1">
              <div 
                className="progress-fill"
                style={{ width: `${book.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  const NavigationTab = ({ tab, icon: Icon, label, isActive, onClick }: {
    tab: Tab,
    icon: any,
    label: string,
    isActive: boolean,
    onClick: () => void
  }) => (
    <button 
      onClick={onClick}
      className={`nav-tab ${isActive ? 'active' : ''}`}
    >
      <Icon size={20} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  const renderHomeTab = () => (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hi, {userName}</h1>
      </div>

      <div className="flex justify-between gap-2">
        <StatCard icon={BookOpen} label="Reading" value={stats.reading} iconColor="text-primary" />
        <StatCard icon={CheckCircle} label="Finished" value={stats.finished} iconColor="text-success" />
        <StatCard icon={Library} label="All Books" value={stats.allBooks} iconColor="text-accent" />
        <StatCard icon={Flame} label="Streak" value={stats.streak} iconColor="text-destructive" />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Reading…</h3>
        <div className="flex space-x-4">
          {currentlyReading.map(book => (
            <BookCover key={book.id} book={book} showProgress={true} size="medium" />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">All Books:</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {allBooks.map(book => (
            <BookCover key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderLibraryTab = () => (
    <div className="p-6 space-y-6 overflow-y-auto">
      <h1 className="text-2xl font-bold text-foreground">Your Library:</h1>
      
      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Reading…</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {currentlyReading.map(book => (
            <BookCover key={book.id} book={book} showProgress={true} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-foreground mb-3">Reading Next…</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {readNext.map(book => (
            <BookCover key={book.id} book={book} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Finished:</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {finishedBooks.map(book => (
            <BookCover key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderConnectTab = () => (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Connect</h1>
      
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Find Reading Friends</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Connect with fellow readers and share your favorite books.
        </p>
        <Button className="w-full">Find Friends</Button>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Join Book Clubs</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Discover reading groups and participate in discussions.
        </p>
        <Button variant="outline" className="w-full">Browse Clubs</Button>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Share Reviews</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Write and share your thoughts about the books you've read.
        </p>
        <Button variant="outline" className="w-full">Write Review</Button>
      </Card>
    </div>
  );

  const renderExploreTab = () => (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Explore</h1>
      
      <Input 
        placeholder="Search for books, authors, genres..."
        className="w-full"
      />

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Ask AI</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Get personalized book recommendations and summaries.
        </p>
        <Input 
          placeholder="What kind of book are you looking for?"
          className="w-full"
        />
      </Card>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Trending Books</h3>
        <div className="grid grid-cols-3 gap-3">
          {[bookCover1, bookCover2, bookCover3, bookCover4, bookCover1, bookCover2].map((cover, index) => (
            <div key={index} className="w-full h-24 book-cover">
              <img src={cover} alt={`Trending book ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-xl font-bold">{userName[0]}</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{userName}</h1>
          <p className="text-muted-foreground">Book Enthusiast</p>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Reading Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Books Read:</span>
            <div className="text-lg font-bold text-foreground">{stats.finished}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Current Streak:</span>
            <div className="text-lg font-bold text-foreground">{stats.streak} days</div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start">
          Edit Profile
        </Button>
        <Button variant="outline" className="w-full justify-start">
          Reading Preferences
        </Button>
        <Button variant="outline" className="w-full justify-start">
          Dark Mode
        </Button>
        <Button variant="outline" className="w-full justify-start">
          Privacy Policy
        </Button>
        <Button variant="outline" className="w-full justify-start text-destructive">
          Logout
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHomeTab();
      case 'library': return renderLibraryTab();
      case 'connect': return renderConnectTab();
      case 'explore': return renderExploreTab();
      case 'profile': return renderProfileTab();
      default: return renderHomeTab();
    }
  };

  return (
    <div className="mobile-container">
      <div className="flex flex-col h-screen">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-card border-t border-border px-2 py-2">
          <div className="flex justify-around">
            <NavigationTab 
              tab="home" 
              icon={Home} 
              label="Home" 
              isActive={activeTab === 'home'} 
              onClick={() => setActiveTab('home')} 
            />
            <NavigationTab 
              tab="library" 
              icon={Library} 
              label="Library" 
              isActive={activeTab === 'library'} 
              onClick={() => setActiveTab('library')} 
            />
            <NavigationTab 
              tab="connect" 
              icon={Users} 
              label="Connect" 
              isActive={activeTab === 'connect'} 
              onClick={() => setActiveTab('connect')} 
            />
            <NavigationTab 
              tab="explore" 
              icon={Search} 
              label="Explore" 
              isActive={activeTab === 'explore'} 
              onClick={() => setActiveTab('explore')} 
            />
            <NavigationTab 
              tab="profile" 
              icon={User} 
              label="Profile" 
              isActive={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSpire;