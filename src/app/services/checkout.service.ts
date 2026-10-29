import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { Constants } from '../constants';
import { CartItem } from '../models/cart.model';

interface CreateCheckoutSessionResponse {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly http = inject(HttpClient);

  async checkout(items: readonly CartItem[]): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<CreateCheckoutSessionResponse>(`${Constants.SERVER_URL}/checkout`, { items }),
    );

    const stripe = await loadStripe(Constants.STRIPE_KEY);

    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const result = await stripe.redirectToCheckout({
      sessionId: response.id,
    });

    if (result.error) {
      throw result.error;
    }
  }
}
