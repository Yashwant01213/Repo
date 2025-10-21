import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { useBooking } from '../context/BookingContext';
import { movies } from '../data/mockData';
import { toast } from 'sonner@2.0.3';
import { CardType } from '../types';

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedMovie, selectedShow, selectedTheater, selectedSeats } = useBooking();

  const [cardType, setCardType] = useState<CardType>('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const movie = selectedMovie || movies.find(m => m.id === id);

  if (!movie || !selectedShow || !selectedTheater || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Invalid booking session</h2>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const getSeatPrice = (seatId: string) => {
    const row = seatId[0];
    if (['A', 'B'].includes(row)) return selectedShow.pricePerSeat * 1.5;
    return selectedShow.pricePerSeat;
  };

  const seatsTotal = selectedSeats.reduce((total, seatId) => {
    return total + getSeatPrice(seatId);
  }, 0);

  const convenienceFee = selectedSeats.length * 20;
  const gst = (seatsTotal + convenienceFee) * 0.18;
  const subtotal = seatsTotal + convenienceFee + gst;

  const discount = cardType === 'credit' ? subtotal * 0.1 : subtotal * 0.05;
  const totalAmount = subtotal - discount;

  const validateCardNumber = (number: string): boolean => {
    const cleaned = number.replace(/\s/g, '');
    return /^\d{16}$/.test(cleaned);
  };

  const validateExpirationDate = (date: string): boolean => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;

    const [month, year] = date.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  };

  const validateCVV = (cvv: string): boolean => {
    return /^\d{3}$/.test(cvv);
  };

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpirationDateChange = (value: string) => {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    setExpirationDate(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate card number
    if (!validateCardNumber(cardNumber)) {
      toast.error('Card number must be 16 digits');
      return;
    }

    // Validate expiration date
    if (!validateExpirationDate(expirationDate)) {
      toast.error('Invalid expiration date. Use MM/YY format and ensure it is in the future');
      return;
    }

    // Validate CVV
    if (!validateCVV(cvv)) {
      toast.error('CVV must be a 3-digit number');
      return;
    }

    // Process payment
    toast.success('Payment processed successfully!');
    navigate(`/movie/${id}/confirmation`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Button
            variant="ghost"
            onClick={() => navigate(`/movie/${id}/booking`)}
            className="mb-2"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Booking Summary
          </Button>
          <h1>Payment</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Payment Form */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5" />
              <h2>Card Details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="mb-3 block">Card Type</Label>
                <RadioGroup value={cardType} onValueChange={(value) => setCardType(value as CardType)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="cursor-pointer">
                      Credit Card (10% discount)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit" className="cursor-pointer">
                      Debit Card (5% discount)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  maxLength={19}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">16-digit card number</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expirationDate">Expiration Date</Label>
                  <Input
                    id="expirationDate"
                    type="text"
                    placeholder="MM/YY"
                    value={expirationDate}
                    onChange={(e) => handleExpirationDateChange(e.target.value)}
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Pay ₹{totalAmount.toFixed(2)}
              </Button>
            </form>
          </Card>

          {/* Payment Summary */}
          <Card className="p-6">
            <h2 className="mb-4">Payment Summary</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Movie</p>
                <p>{movie.title}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-gray-600 mb-1">Theater</p>
                <p>{selectedTheater.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Show Time</p>
                <p>{selectedShow.date} at {selectedShow.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Seats</p>
                <p>{selectedSeats.join(', ')}</p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Seats ({selectedSeats.length})</span>
                  <span>₹{seatsTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Convenience Fee</span>
                  <span>₹{convenienceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>{cardType === 'credit' ? 'Credit' : 'Debit'} Card Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
