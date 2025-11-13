

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.*;

import java.sql.*;

/**
 * Servlet implementation class gmu_servlet
 */
@WebServlet("/gmu_servlet")
public class gmu_servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	 public void doGet(HttpServletRequest request, HttpServletResponse response){
	        try
	        {
	            String url = "jdbc:mysql://turntable.proxy.rlwy.net:44955/gmu";
		        String user = "root";
		        String password = "xlLnDOFxroMxPrsYFLbhVVGvdXfOhBQy";
	        	//String url = System.getenv("DATABASE_URL");
	        	//String user = System.getenv("DATABASE_USER");
	        	//String password = System.getenv("DATABASE_PASS");
	            Connection conn = DriverManager.getConnection(url, user, password);
	            Statement stmt = conn.createStatement();
	            ResultSet rs = stmt.executeQuery("SELECT * FROM user");
	           
	            String result = "";
	            
	            //Creates a Writer for output
	            response.setContentType("text/html");
	            PrintWriter out = response.getWriter();
	            out.println("<h1>Hello, world!</h1>");
	            
	            while(rs.next())
	            {
	                result += rs.getString(1) + "," + rs.getString(2) + "," + rs.getString(3) + "#";
	            }
	            out.println("<h1>" + result + "</h1>");
	            conn.close();
	        }
	        catch (Exception e)
	        {
	            System.out.println("" + e.getMessage());
	        }
	    }
    public gmu_servlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
