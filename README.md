# Portfolio site

Static site hosted on GitHub Pages, with login, uploads, and starring powered by a free Supabase project.

## 1. Create the Supabase backend (about 5 minutes)

1. Sign up at supabase.com and create a new project.
2. Open **SQL Editor**, paste the contents of `setup.sql`, and run it.
3. Open **Authentication > Users > Add user**, enter your email and a strong password, and tick "Auto confirm user".
4. Open **Authentication > Sign In / Providers** and turn **off** "Allow new users to sign up". This is what keeps everyone else from logging in.
5. Open **Project Settings > API** and copy the **Project URL** and the **anon public** key.

The anon key is designed to be public. The database rules in `setup.sql` stop anyone who isn't logged in from changing anything.

## 2. Edit `index.html`

Near the top of the script, fill in `CONFIG`: your name, tagline, the Supabase URL and key, and your SCRAPP-E website URL.

## 3. Publish on GitHub

1. Create a new repository on GitHub (for a clean address, name it `YOUR-USERNAME.github.io`).
2. Upload `index.html` and `README.md` (`setup.sql` is optional).
3. Go to **Settings > Pages**, set the source to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. Your site goes live in a minute or two at `https://YOUR-USERNAME.github.io`.

## Using the site

- Select **Log in** and sign in with the user you created.
- In any tab (SolidWorks, Biology, Vet Med) select **New post**. Add a title, description, a project file (.sldprt, .sldasm, .zip), a PDF of your drawing, and a cover image.
- Select **Show on home page** on any post to feature it on the Home tab. Select it again to remove it.
- Visitors can browse and download files but cannot log in or change anything.

## Notes

- Supabase's free plan limits each file to 50 MB and total storage to 1 GB. Zip large assemblies.
- To add or rename sections, edit the `SECTIONS` list in `index.html` and the `category` check in `setup.sql`.
- Files are public once uploaded. Don't upload anything confidential, such as client or patient information.
