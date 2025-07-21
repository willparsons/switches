<a href="https://unrivaled-speculoos-e0a422.netlify.app">
  <h1 align="center">Switch Catalogue</h1>
</a>

<p align="center">
    Find your switch, today.
</p>

<p align="center">
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
</p>

<br/>

## Demo

You can view a very early demo at [unrivaled-speculoos-e0a422.netlify.app](https://unrivaled-speculoos-e0a422.netlify.app).

## Clone and run locally

1. Clone the repo

    ```bash
    git clone https://github.com/willparsons/switches.git
    ```

2. Cd into the repo and install dependencies

    ```bash
    cd switches
    npm ci
    ```

3. Rename `.env.example` to `.env` and update the following:

    ```
    NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
    ```

4. You can now run the local development server:

    ```bash
    npm run dev
    ```

    The project should now be running on [localhost:3000](http://localhost:3000/).
