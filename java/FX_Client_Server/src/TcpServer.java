import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Semaphore;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.net.ssl.SSLServerSocket;
import javax.net.ssl.SSLServerSocketFactory;
import javax.net.ssl.SSLSocket;

import javafx.scene.control.TextArea;


public class TcpServer extends Thread{
	public static final int PORT = 9090;
	public static final String paraulaTancarConnexio = "desconectar";
	protected static List<SSLSocket> clientsSocket = new ArrayList<SSLSocket>(); //Guardo els sockets dels clients aqui
	protected static List<String> nomUsuaris = new ArrayList<String>(); //Guardo els noms d'usuaris aqui
	protected static List<Boolean> nomUsuariRebut = new ArrayList<Boolean>(); //Per a no enviar dades a usuaris que encara no hagin entrat el nom d'usuari
	
	protected Semaphore enviarDades = new Semaphore(0);
	private TextArea textArea;
	protected DadesCompartidaServidor dadesCompartides = new DadesCompartidaServidor();
	
	public TcpServer(TextArea textArea) {
		this.textArea = textArea;
	}
	
	@Override
	public void run() {
		try {
			listen();
		} catch (Exception e1) {
			System.out.println("Excepció Servidor: " + e1);
		}
	}
	
	public void listen() {
		SSLServerSocketFactory sslFactory = (SSLServerSocketFactory) SSLServerSocketFactory.getDefault();
		SSLServerSocket serverSocket = null;
		SSLSocket clientSocket = null;
		
		try {
			serverSocket = (SSLServerSocket) sslFactory.createServerSocket(PORT);
			TcpServerThreadEnviar tcpServerThreadEnviar = new TcpServerThreadEnviar(clientSocket, enviarDades, dadesCompartides, textArea, serverSocket);
			tcpServerThreadEnviar.start();
			
			//Accepto clients fins que getStopServidor canvii
			while (!dadesCompartides.getStopServidor()) {
				//Aquest try per a tancar el servidor
				try {
					clientSocket = (SSLSocket) serverSocket.accept();
				} catch (Exception e) {
				}
				TcpServerThreadRebre tcpServerThreadRebre = new TcpServerThreadRebre(clientSocket, enviarDades, dadesCompartides, textArea);
				tcpServerThreadRebre.start();
				clientsSocket.add(clientSocket);
				nomUsuariRebut.add(false);
			}
			
			//Quan els fils acabin reiniciem les variables estatiques que necessitem buides per a la següent vegada que enjeguem el servidor
			try {
				tcpServerThreadEnviar.join();
				nomUsuariRebut = new ArrayList<Boolean>();
				nomUsuaris = new ArrayList<String>();
				clientsSocket = new ArrayList<SSLSocket>();
			} catch (Exception e) {
			}
			
		} catch (IOException ex) {
			Logger.getLogger(TcpServer.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
}
