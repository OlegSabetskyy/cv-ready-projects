import java.io.FileInputStream;

import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.image.Image;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.CornerRadii;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.stage.Stage;

//Aquesta classe s'encarrega de la interficie del Servidor
//PD: El servidor .gitignore es degut a que la professora de M5 ens ha demanat que pujem els projectes que anem fent
//a Github, per a demostrar que entenem mes o menys com funciona
public class ServidorInterficie extends Application{
	//variables per al tamany dels elements de la finestra
	public final float WIDTH_PESTANYA = 700;
	public final float HEIGHT_PESTANYA = 600;
	public final float WIDTH_ADINS = 600;
	public final float HEIGHT_ADINS = 500;
	public final float WIDTH_TEXTAREA = 550;
	public final float HEIGHT_TEXTAREA = 325;
	public final float WIDTH_BOTONS = 175;
	public final float HEIGHT_BOTONS = 60;
	
	//Altres variables
	protected boolean servidorEnjegat = false;
	private TcpServer tcpServer;
	
	public static void main(String[] args) {
		System.setProperty("javax.net.ssl.keyStore", "ServerKeyStore.jks");
		System.setProperty("javax.net.ssl.keyStorePassword", "123456");
		Application.launch(args);
	}
	
	//Encara que vegis alguna excepció, les coses haurien de funcionar bé, i, l'usuari estandar (sense consola) no hauria de notar cap cosa extranya
	@Override
	public void start(Stage primaryStage) throws Exception {
		VBox hBoxAdins = crearVboxAdins();;
		
		HBox vBoxBotons = (HBox) hBoxAdins.getChildren().get(2);
		stopButton((Button) vBoxBotons.getChildren().get(0), (TextArea) hBoxAdins.getChildren().get(1));
		startButton((Button) vBoxBotons.getChildren().get(1), (TextArea) hBoxAdins.getChildren().get(1));
		
		Label labelTotal = new Label("", hBoxAdins);
		labelTotal.setMaxSize(WIDTH_PESTANYA, HEIGHT_PESTANYA);
		labelTotal.setMinSize(WIDTH_PESTANYA, HEIGHT_PESTANYA);
		labelTotal.setAlignment(Pos.CENTER);
		labelTotal.setBackground(new Background(new BackgroundFill(Color.BLUE, new CornerRadii(0), Insets.EMPTY)));
		
		primaryStage.getIcons().add(new Image(new FileInputStream("./ServerIcon.png")));
		primaryStage.setTitle("Servidor");
		Scene scene = new Scene(labelTotal);
		primaryStage.setScene(scene);
		primaryStage.show();
	}
	
	//Parar servidor
	private void stopButton(Button botoStop, TextArea textArea) {
		botoStop.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				if(tcpServer != null && servidorEnjegat) {
					//Aviso als threads de que el servidor s'ha de parar
					tcpServer.dadesCompartides.setStopServidor(true);
					tcpServer.enviarDades.release();
					servidorEnjegat = false;
					textArea.setText(textArea.getText() + "\n [SERVIDOR] Servidor parat");
				}else {
					textArea.setText(textArea.getText() + "\n [SERVIDOR] No és pot parar el servidor ja que el servidor ja està parat");
				}
			}
		});
	}

	//Enjegar servidor
	private void startButton(Button botoStart, TextArea textArea) {
		botoStart.setOnAction(new EventHandler<ActionEvent>() {
			@Override
			public void handle(ActionEvent event) {
				if(!servidorEnjegat) {
					//Reinici de variable tcpServer per a tornar a iniciar el Servidor
					tcpServer = null;
					tcpServer = new TcpServer(textArea);
					tcpServer.start();
					servidorEnjegat = true;
					textArea.setText(textArea.getText() + "\n [SERVIDOR] Servidor iniciat");
				}else {
					textArea.setText(textArea.getText() + "\n [SERVIDOR] No és pot iniciar de nou el servidor ja que ja està iniciat");
				}
			}
		});
	}
	
	//Part visual
	private VBox crearVboxAdins() {
		Text textServidor = new Text("Servidor");
		TextArea textArea = new TextArea();
		Button botoStop = new Button("Parar");
		Button botoStart = new Button("Iniciar");
		
		textServidor.setFont(Font.font(25));
		textServidor.setFill(Color.WHITE);;
		textServidor.setStyle("-fx-underline: true;");
		
		textArea.setMinSize(WIDTH_TEXTAREA, HEIGHT_TEXTAREA);
		textArea.setMaxSize(WIDTH_TEXTAREA, HEIGHT_TEXTAREA);
		textArea.setWrapText(true);
		textArea.setEditable(false);
		
		modificarBoto(botoStop, Color.RED);
		modificarBoto(botoStart, Color.GREEN);
				
		HBox hBoxBotons = new HBox(botoStop, botoStart);
		hBoxBotons.setAlignment(Pos.CENTER);
		HBox.setMargin(botoStop, new Insets(0, 25, 0, 0));
		HBox.setMargin(botoStart, new Insets(0, 0, 0, 25));
		
		VBox vBoxAdins = new VBox(textServidor, textArea, hBoxBotons);
		vBoxAdins.setBackground(new Background(new BackgroundFill(Color.DODGERBLUE ,new CornerRadii(0), Insets.EMPTY)));
		vBoxAdins.setMaxSize(WIDTH_ADINS, HEIGHT_ADINS);
		vBoxAdins.setMinSize(WIDTH_ADINS, HEIGHT_ADINS);
		vBoxAdins.setAlignment(Pos.CENTER);
		VBox.setMargin(textServidor, new Insets(0, 0, 20, 0));
		VBox.setMargin(hBoxBotons, new Insets(20, 0, 0, 0));
		
		return vBoxAdins;
	}
	
	public void modificarBoto(Button boto, Color color) {
		boto.setMinSize(WIDTH_BOTONS, HEIGHT_BOTONS);
		boto.setMaxSize(WIDTH_BOTONS, HEIGHT_BOTONS);
		boto.setBackground(new Background(new BackgroundFill(color ,new CornerRadii(0), Insets.EMPTY)));
		boto.setStyle("-fx-text-fill:white;");
		boto.setFont(Font.font(15));
	}
}
