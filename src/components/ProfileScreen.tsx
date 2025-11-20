import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { User, GraduationCap, Trophy, Bell, Shield, Settings, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  creditScore: number;
  degreeProgress: number;
}

export function ProfileScreen({ creditScore, degreeProgress }: ProfileScreenProps) {
  const achievements = [
    { id: 1, name: 'First Payment', description: 'Reported your first payment', icon: '🎉', unlocked: true },
    { id: 2, name: 'Consistent Reporter', description: 'Reported 3 consecutive payments', icon: '🔥', unlocked: true },
    { id: 3, name: 'Debt Destroyer', description: 'Paid off your first debt', icon: '💪', unlocked: false },
    { id: 4, name: 'Credit Builder', description: 'Reached 600 credit score', icon: '⭐', unlocked: true },
    { id: 5, name: 'Smart Saver', description: 'Saved £500 in one month', icon: '💰', unlocked: false },
    { id: 6, name: 'Graduate Ready', description: 'Reached Level 4', icon: '🎓', unlocked: false },
  ];

  const settings = [
    { name: 'Notifications', icon: Bell, action: 'Manage alerts' },
    { name: 'Visa Settings', icon: Shield, action: 'Update term dates' },
    { name: 'Preferences', icon: Settings, action: 'App settings' },
  ];

  return (
    <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-1">Your account and progress</p>
      </div>

      {/* Profile Card */}
      <Card className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <p className="text-2xl">Udaya Bhandarkar</p>
            <p className="text-indigo-100 text-sm mt-1">International Student</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge className="bg-white/20 text-white border-0">
                <GraduationCap className="w-3 h-3 mr-1" />
                MSc Business Analytics
              </Badge>
              <Badge className="bg-white/20 text-white border-0">
                Year 1
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Degree Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-slate-900">Degree Progress</p>
            <p className="text-slate-500 text-sm mt-1">Level {Math.floor(degreeProgress / 25) + 1}</p>
          </div>
          <p className="text-3xl text-indigo-600">{degreeProgress}%</p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div 
            className="bg-indigo-600 rounded-full h-3 transition-all duration-500"
            style={{ width: `${degreeProgress}%` }}
          />
        </div>
        <p className="text-slate-500 text-sm mt-2">
          {100 - degreeProgress}% to graduation
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-slate-600 text-sm">Credit Score</p>
          <p className="text-3xl text-slate-900 mt-2">{creditScore}</p>
          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 mt-2">
            Fair
          </Badge>
        </Card>
        <Card className="p-4">
          <p className="text-slate-600 text-sm">Total Saved</p>
          <p className="text-3xl text-slate-900 mt-2">£340</p>
          <p className="text-emerald-600 text-sm mt-2">+12% this month</p>
        </Card>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-slate-900">Achievements</p>
          <Badge variant="outline" className="text-indigo-600 border-indigo-200">
            <Trophy className="w-3 h-3 mr-1" />
            3/6 Unlocked
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`p-3 ${achievement.unlocked ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 opacity-50'}`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-slate-900 text-sm">{achievement.name}</p>
                <p className="text-slate-500 text-xs mt-1">{achievement.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div>
        <p className="text-slate-900 mb-3">Settings</p>
        <div className="space-y-2">
          {settings.map((setting) => (
            <Card key={setting.name} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <setting.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-slate-900">{setting.name}</p>
                    <p className="text-slate-500 text-sm">{setting.action}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <p className="text-slate-900 mb-3">Quick Actions</p>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            Export Financial Report
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Update Visa Information
          </Button>
          <Button variant="outline" className="w-full justify-start text-rose-600 hover:text-rose-700">
            Sign Out
          </Button>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-4 bg-slate-50">
        <div className="text-center text-slate-500 text-sm">
          <p>DebtFree v1.0.0</p>
          <p className="mt-1">Helping international students thrive</p>
        </div>
      </Card>
    </div>
  );
}