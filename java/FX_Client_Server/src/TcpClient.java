import java.io.IOException;
import java.net.UnknownHostException;
import java.util.concurrent.Semaphore;

import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;

import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

public class TcpClient extends Thread {
	//Classe que s'encarrega d'executar els els fils de rebre i enviar dades
	private Semaphore acabarConnexio = new Semaphore(0);
	private Semaphore comencarRebreDades = new Semaphore(0); //per a que no rebin dades abans de ficar el nom d'usuari
	private Semaphore botoPremut;
	private final String IP = "127.0.0.1";	
	private TextField textField;
	private TextArea textArea;
	private Semaphore desconectar;
	
	public TcpClient (TextArea textArea, TextField textField, Semaphore botoPremut, Semaphore desconectar) {
		this.textArea = textArea;
		this.textField = textField;
		this.botoPremut = botoPremut;
		this.desconectar = desconectar;
	}
	
	@Override
	public void run() {
		try {
			connect(IP, TcpServer.PORT); //L'�s de la variable TcpServer.PORT �s pot evitar ficant directament el valor, pero ho he fet aix� per a que sigui m�s senzill realitzar canvis
		} catch (Exception e1) {
			System.out.println("Excepci� Servidor: " + e1);
		}
	}
	
	public void connect(String address, int port) {
		try {
			SSLSocketFactory sslFactory = (SSLSocketFactory) SSLSocketFactory.getDefault();
			SSLSocket clientSocket = (SSLSocket) sslFactory.createSocket("localhost", port);
			
			TcpClientThreadEnviar tcpClientThreadEnviar = new TcpClientThreadEnviar(clientSocket, this.acabarConnexio, this.comencarRebreDades, this.textArea, this.textField, this.botoPremut, desconectar);
			TcpClientThreadRebre tcpClientThreadRebre = new TcpClientThreadRebre(clientSocket, this.acabarConnexio, this.comencarRebreDades, this.textArea);
			tcpClientThreadEnviar.start();
			tcpClientThreadRebre.start();
			
		} catch (UnknownHostException ex) {
			System.out.println("Error de connexi�. No existeix el host" + ex);
			System.exit(0);
		} catch (IOException ex) {
			System.out.println("Error de connexi� indefinit" + ex);
			System.exit(0);
		}
	}
}