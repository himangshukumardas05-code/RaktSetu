import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import { Separator } from "../../components/ui/separator";
import { Progress } from "../../components/ui/progress";
import { Button } from "../../components/ui/button";

import BloodSeeker from './BloodSeeker';
import { useState, useEffect } from 'react';

export default function BloodDashboard() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  
  // Show the blood request form automatically when component mounts
  useEffect(() => {
    setShowRequestForm(true);
  }, []);
  return (
    <div className="min-h-screen bg-slate text-red-500 p-6 grid grid-cols-4 gap-6">
      {/* Header */}
      <header className="col-span-4 flex justify-between items-center border-b border-red-700 pb-2">
        <h1 className="text-lg font-bold">BLOOD MAP DASHBOARD</h1>
        <div className="flex items-center gap-4">
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => setShowRequestForm(true)}
          >
            Request Blood
          </Button>
          <p className="text-sm">10:53:27 • 2019</p>
        </div>
      </header>

      {/* Blood Request Form Dialog */}
      <BloodSeeker
        isOpen={showRequestForm}
        onClose={() => setShowRequestForm(false)}
      />

      {/* Target Profile */}
      <Card className="bg-slate border-red-800">
        <CardHeader>
          <CardTitle className="text-sm text-red-400">Target Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://via.placeholder.com/64" />
            <AvatarFallback>TG</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p>Elangan: 6.50</p>
            <p>23.20</p>
            <p>56.25</p>
          </div>
          <Separator className="bg-red-700" />
          <p className="text-xs">Blood Type</p>
          <Progress value={60} className="bg-slate" />
        </CardContent>
      </Card>

      {/* Blood Map */}
      <Card className="col-span-2 bg-slate border-red-800">
        <CardHeader>
          <CardTitle className="text-sm text-red-400">Blood Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate h-[400px] rounded-lg flex items-center justify-center text-red-600 border border-red-700">
            Map Placeholder
          </div>
        </CardContent>
      </Card>

      {/* Resource Management */}
      <Card className="bg-slate border-red-800">
        <CardHeader>
          <CardTitle className="text-sm text-red-400">Resource Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-xs">Current: 556</p>
          <p className="text-xs">Dandas: 35,12.50</p>
          <Separator className="bg-red-700" />
          <p className="text-xs">Blood Reserves</p>
          <Progress value={20} className="bg-red-900" />
          <Progress value={50} className="bg-red-900" />
          <Progress value={80} className="bg-red-900" />
        </CardContent>
      </Card>

      {/* Detection Log */}
      <Card className="bg-slate border-red-800">
        <CardHeader>
          <CardTitle className="text-sm text-red-400">Detection Log</CardTitle>
        </CardHeader>
        <CardContent className="text-xs space-y-1">
          {["Poom Pwoim", "Percemt", "M99.AND", "Gratts", "Chandour"].map(
            (item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item}</span>
                <span>{Math.floor(Math.random() * 900)}</span>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Tool Inventory */}
      <Card className="bg-slate border-red-800">
        <CardHeader>
          <CardTitle className="text-sm text-red-400">Tool Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-red-800 hover:bg-red-700 text-xs">Snajor</Button>
            <Button className="bg-red-800 hover:bg-red-700 text-xs">Sand</Button>
            <Button className="bg-red-800 hover:bg-red-700 text-xs">Sensor</Button>
            <Button className="bg-red-800 hover:bg-red-700 text-xs">Sengor</Button>
          </div>
        </CardContent>
      </Card>

      {/* Mission Tracker */}
      <Card className="bg-slate border-red-800 col-span-2">
        <CardHeader>
          <CardTitle className="text-sm text-red-400">Mission Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[150px] bg-slate rounded-lg flex items-center justify-center text-red-600">
            Graph Placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
