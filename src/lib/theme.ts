import { cookies } from 'next/headers';

export async function getTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;
  return theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : null;
}

/**
 * Update the theme in the cookies.
 * @param formData - The form data containing the `theme` field with the value `dark` or `light`
 */
export async function updateTheme(formData: FormData) {
  'use server';
  console.log('updateThemeCookies', formData);
  const theme = formData.get('theme');
  console.log('theme', theme);
  const cookieStore = await cookies();

  if (theme && typeof theme === 'string') {
    cookieStore.set('theme', theme);
  } else {
    cookieStore.delete('theme');
  }
}
