import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import Select from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";

interface FormData {
  state: string;
  district: string;
  pincode: string;
  contact: string;
  feedback: string;
  proofImage: File | null;
  bloodGroup: string;
  units: string;
  urgency: string;
}

interface BloodSeekerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BloodSeeker = ({ isOpen, onClose }: BloodSeekerProps) => {
  const [formData, setFormData] = useState<FormData>({
    state: "",
    district: "",
    pincode: "",
    contact: "",
    feedback: "",
    proofImage: null,
    bloodGroup: "",
    units: "",
    urgency: "",
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = () => {
    console.log("Form Data Submitted:", formData);
    localStorage.setItem('bloodRequestData', JSON.stringify(formData));
    setShowConfirmDialog(false);
    navigate('/seeker/dashboard', { state: { formData } });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-red-600">
            🩸 Raktsetu is always here for you, anytime you need.
          </DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form below to request blood
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">

              {/* Need Blood Section */}
              <div className="border p-4 rounded-xl bg-red-50">
                <h2 className="text-lg font-semibold text-red-700 mb-4">Need Blood</h2>

                {/* Blood Group */}
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  options={[
                    { label: "A+", value: "A+" },
                    { label: "A-", value: "A-" },
                    { label: "B+", value: "B+" },
                    { label: "B-", value: "B-" },
                    { label: "O+", value: "O+" },
                    { label: "O-", value: "O-" },
                    { label: "AB+", value: "AB+" },
                    { label: "AB-", value: "AB-" },
                  ]}
                  value={formData.bloodGroup}
                  placeholder="Select blood group"
                  onChange={(value: string) => handleSelectChange("bloodGroup", value)}
                />
                </div>

                {/* Units Required */}
                <div>
                  <Label htmlFor="units">Units Required</Label>
                  <Input
                    id="units"
                    name="units"
                    type="number"
                    placeholder="Enter number of units"
                    value={formData.units}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Urgency */}
                <div>
                  <Label htmlFor="urgency">Urgency</Label>
                <Select
                  options={[
                    { label: "Immediate", value: "Immediate" },
                    { label: "Within 24 hours", value: "Within 24 hours" },
                    { label: "Within 3 days", value: "Within 3 days" },
                  ]}
                  value={formData.urgency}
                  placeholder="Select urgency level"
                  onChange={(value: string) => handleSelectChange("urgency", value)}
                />
                </div>
              </div>

              {/* State */}
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="Enter your state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* District */}
              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="Enter your district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Pincode */}
              <div>
                <Label htmlFor="pincode">Pin Code</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  type="number"
                  placeholder="Enter your area pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Contact */}
              <div>
                <Label htmlFor="contact">Phone / Email</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="text"
                  placeholder="Enter phone number or email"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="proofImage">Upload Proof (blood bag or receipt)</Label>
                <Input
                  id="proofImage"
                  name="proofImage"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {formData.proofImage && (
                  <p className="text-sm mt-2 text-gray-600">
                    Selected: {formData.proofImage.name}
                  </p>
                )}
              </div>

              {/* Feedback */}
              <div>
                <Label htmlFor="feedback">Description</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Share your experience..."
                  value={formData.feedback}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700">
                  Submit Request
                </Button>
              </div>
            </form>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Blood Request</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to submit this blood request? Your request will be processed immediately.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Request Details:</h3>
                    <p>Blood Group: {formData.bloodGroup}</p>
                    <p>Units Required: {formData.units}</p>
                    <p>Urgency: {formData.urgency}</p>
                    <p>Location: {formData.district}, {formData.state}</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={handleConfirmSubmit}>
                    Confirm Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export default BloodSeeker;
