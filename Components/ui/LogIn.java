package Components.ui;
import java.sql.*;

public class LogIn {
    String givenUsername;
    String givenPassword;

    LogIn(String givenUsername, String givenPassword) {
        this.givenUsername = givenUsername;
        this.givenPassword = givenPassword;
    }
    boolean usernameCorrect(String username) {
        return false; //change to search for username, check if given username is in the database
    }

    boolean passwordCorrect(String password) {
        return false; //change to search for password, dont check if username isn't in database
    }

    boolean loggedIn(String username, String password) {
    return usernameCorrect(username) && passwordCorrect(password);
    }

    public static void main(String[] args) throws SQLException {
        //String url = "jdbc:mysql://localhost:3306/MedicalDB";
        //String databaseUsername = "root";
        //String databasePassword = "cs321team9";

        //Connection con = DriverManager.getConnection(url, databaseUsername, databasePassword);
    }
}