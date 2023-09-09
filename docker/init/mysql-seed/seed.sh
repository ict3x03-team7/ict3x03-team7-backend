echo "*****************************************************"
echo "STARTING SEEDING SCRIPT FOR MYSQL DATABASE!"
echo "*****************************************************"

echo "Installing required modules"
pip install -r requirements.txt

echo "Waiting For DB to Start"
python SEED00-wait.py

echo "Seeding Start"
python SEED00-dummy.py

echo "*****************************************************"
echo "FINISH SEEDING!"
echo "*****************************************************"