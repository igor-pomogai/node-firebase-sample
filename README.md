### To run the project:
1. Create `.env` file in root directory
2. Add `FIREBASE_URL=<path to your firebase db>` in it
3. Download service account json file from your firebase serviceAccount
4. Save it to `local.json` file
5. Run `npm start`

### There are 2 APIs:
  * `POST /something` will catch everithing you send in body in json format and push it to firebase.
  * `GET /something` will return all the records you have saved to firebase.
