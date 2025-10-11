package Components.ui;
import java.sql.*;

public class logIn {
    String givenUsername;
    String givenPassword;

    logIn(String givenUsername, String givenPassword) {
        this.givenUsername = givenUsername;
        this.givenPassword = givenPassword;
    }
    boolean usernameCorrect(String username) {
        return false; //change
    }

    boolean passwordCorrect(String password) {
        return false; //change
    }

    boolean loggedIn(String username, String password) {
    return usernameCorrect(username) && passwordCorrect(password);
    }

    public static void main(String[] args) throws SQLException {
        String url = "jdbc:mysql://localhost:3306/MedicalDB";
        String databaseUsername = "cs321";
        String databasePassword = "team9";

        Connection con = DriverManager.getConnection(url, databaseUsername, databasePassword);
    }
}