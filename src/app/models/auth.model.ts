export interface LoginDto {
  email: string;
  password: string;
}

// Update this to match your .NET AuthResponseDto
export interface AuthResponse {
  token: string;
  email: string;
  role: string;
}

// You can also keep the user object if you prefer
export interface AuthResponseWithUser {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}